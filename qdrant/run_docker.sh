#!/bin/bash

docker run --rm -d -p 6333:6333 -p 6334:6334 \
    -v $(pwd)/storage:/qdrant/storage:z \
    qdrant/qdrant


