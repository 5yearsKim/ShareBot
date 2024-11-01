from abc import ABC, abstractmethod
from typing import Literal

from ..schema import Point, ScoredPoint


class BaseVectorStore(ABC):
    def __init__(self) -> None:
        pass

    @abstractmethod
    def get(self, id: int | str) -> Point:
        raise NotImplementedError

    @abstractmethod
    def get_many(
        self,
        group_id: int | None = None,
        file_id: int | None = None,
        limit: int = 30,
        offset: str | None = None,
        with_vector: bool = False,
        order_by: Literal["asc", "desc"] | None = None,
    ) -> tuple[list[Point], str | None]:
        raise NotImplementedError

    @abstractmethod
    def upsert(self, point: Point) -> None:
        raise NotImplementedError

    @abstractmethod
    def upsert_many(self, points: list[Point]) -> None:
        raise NotImplementedError

    @abstractmethod
    def delete_many(self, ids: list[int | str]) -> None:
        raise NotImplementedError

    @abstractmethod
    def search(
        self,
        group_id: int,
        query_vector: list[float],
        limit: int = 10,
        score_threshold: float = 0.0,
    ) -> list[ScoredPoint]:
        raise NotImplementedError
