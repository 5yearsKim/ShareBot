FROM python:3.10-slim

WORKDIR /app
RUN pip install poetry

RUN poetry config virtualenvs.in-project true

COPY poetry.lock pyproject.toml /app/

RUN poetry install --no-root --without dev

COPY config.py main.py  /app/
COPY group_ragger /app/group_ragger
COPY doc_converter /app/doc_converter

ENV VIRTUAL_ENV=/app/.venv \
    PATH="/app/.venv/bin:$PATH"

EXPOSE 6010

CMD ["fastapi", "run", "main.py", "--port", "6010"]






