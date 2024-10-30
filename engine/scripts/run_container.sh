#!/bin/bash

docker run --rm -d \
    -p 6010:6010 \
    --env-file ./.env \
    --name sharebot-engine \
    onionkim/sharebot-engine:1.0
