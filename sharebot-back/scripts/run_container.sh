#!/bin/bash

docker run --rm \
  --env-file ./.env.docker \
  --name sharebot-back \
  -p 6020:6020 \
  onionkim/sharebot-back:1.0