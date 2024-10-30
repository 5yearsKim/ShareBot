import logging
from typing import Iterable

from langchain.text_splitter import RecursiveCharacterTextSplitter

from .embedder import BaseEmbedder
from .generator import BaseGenerator
from .rag_checker import OpenAIChecker
from .schema import Group, Message, MessageRole, Point, StreamOutput
from .utils import cut_messages
from .vector_store import BaseVectorStore


class GroupRagger:
    def __init__(
        self,
        generator: BaseGenerator,
        embedder: BaseEmbedder,
        vector_store: BaseVectorStore,
        checker: OpenAIChecker,
        verbose: bool = False,
    ) -> None:
        self.generator = generator
        self.embedder = embedder
        self.vector_store = vector_store
        self.checker = checker
        self.verbose = verbose

        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000, chunk_overlap=100, add_start_index=True
        )

        # log를 console에 출력
        self.logger = logging.getLogger("group_ragger")
        stream_handler = logging.StreamHandler()
        formatter = logging.Formatter(
            "----[%(levelname)s]-%(asctime)s---- \n %(message)s \n"
        )
        stream_handler.setFormatter(formatter)
        self.logger.addHandler(stream_handler)
        self.logger.setLevel(logging.INFO)

    def respond(
        self,
        messages: list[Message],
        group: Group,
        generator: BaseGenerator | None = None,
    ) -> Iterable[StreamOutput]:
        """
        Get the messages from the user and respond to them with RAG
        """
        _generator = generator or self.generator

        if len(messages) == 0:
            messages.append(
                Message(role=MessageRole.USER, content="안녕"),
            )

        short_end_messages = cut_messages(messages, max_len=300, max_turn=3)
        rag_input = self.checker.check_rag(short_end_messages)

        messages = cut_messages(messages, max_len=1000, max_turn=8)

        # log rag_input
        if self.verbose:
            self.logger.info("RAG input: %s", rag_input)

        if rag_input.should_retrieve and rag_input.query:
            query = rag_input.query
            vectors = self.embedder.encode([query])

            retrieved = self.vector_store.search(
                group.id, vectors[0], limit=5, score_threshold=0.25
            )

            infos: list[str] = []
            for i, point in enumerate(retrieved):
                infos.append(f"{i + 1}. {point.content}")

            if self.verbose:
                self.logger.info("retrieved: %s", infos)

            guide = f"""
너의 이름은 '셰어봇', 다음 원칙들을 지켜서 대답해줘.
1. 유저들에게는 공손하게 대답해줘.
2. 유저가 물어보는 질문에는 다음 정보 중 가장 정확한 정보를 기반으로 대답해줘. 질문에 해당하는 정보가 없으면 모른다고 대답해줘.
정보: {" / ".join(infos)}
            """
            # 3. 답변은 너무 길지 않게 해줘. (최대 80자)

            messages.insert(0, Message(role=MessageRole.SYSTEM, content=guide))

            return _generator.generate_stream(messages)
        else:
            prompt = """
너의 이름은 '셰어봇'. 다음 원칙들을 지켜서 대답해줘..
1. 유저들에게는 항상 공손하게 대답해줘.
2. 답변은 너무 길지 않게 간결하게.
            """
            messages.insert(0, Message(role=MessageRole.SYSTEM, content=prompt))
            return _generator.generate_stream(messages)

    def trigger(
        self,
        messages: list[Message],
        group: Group,
        gossip_ratio: float = 0.6,
        generator: BaseGenerator | None = None,
    ) -> Iterable[StreamOutput]:
        """
        Start a new chat given the messages
        """
        _generator = generator or self.generator
        prompt = f"""
너의 이름은 '셰어봇'.
다음 원칙을 지켜줘.
"""
        prompt_rule: list[str] = ["유저들에게는 공손하게 대답해줘."]

        if len(messages) == 0:
            prompt_rule.append(
                "대화를 시작하는 단계이니 유저한테 인사 하고 어떤 것이 궁금하냐고 물어줘."
            )
        else:
            prompt_rule.append("문맥을 고려하되 유저와의 대화를 새로 시작해줘")

        # prompt concat
        for i, rule in enumerate(prompt_rule):
            prompt += f"{i + 1}. {rule}\n"

        if self.verbose:
            self.logger.info("Trigger prompt: %s", prompt)

        messages.insert(0, Message(role=MessageRole.SYSTEM, content=prompt))
        return _generator.generate_stream(messages)

    def memorize(
        self,
        content: str,
        group_id: int,
        user_id: int | None = None,
        file_id: int | None = None,
    ) -> list[Point]:
        chunks = self.text_splitter.split_text(content)

        vectors = self.embedder.encode(chunks)

        if file_id:
            self.forget(file_id)

        points = [
            Point(
                id=Point.generate_id(),
                vector=vector,
                content=chunk,
                group_id=group_id,
                meta={"user_id": user_id, "file_id": file_id},
            )
            for vector, chunk in zip(vectors, chunks)
        ]

        self.vector_store.upsert_many(points)
        return points

    def forget(self, file_id: int) -> list[Point]:
        points, _ = self.vector_store.get_many(file_id=file_id)
        if points:
            self.vector_store.delete_many([point.id for point in points])
        return points
