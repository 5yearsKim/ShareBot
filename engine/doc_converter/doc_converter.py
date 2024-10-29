import pymupdf


class DocConverter:
    def __init__(self) -> None:
        pass

    def pdf_byte2text(self, bytes: bytes) -> str:
        with pymupdf.open(stream=bytes, filetype="pdf") as doc:
            return self._doc2text(doc)

    def pdf2text(self, path: str) -> str:
        with pymupdf.open(path) as doc:
            return self._doc2text(doc)

    def _doc2text(self, doc: pymupdf.Document) -> str:
        texts: list[str] = []
        for page in doc:
            text = page.get_text()
            texts.append(text)
        return "".join(texts)
