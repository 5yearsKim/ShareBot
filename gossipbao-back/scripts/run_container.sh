#!/bin/bash

docker run --env-file ./.env \
  -d -p 5010:5010 \
  --name gossip-back \
  --add-host=host.docker.internal:host-gateway \
  onionkim/gossip-back