#!/bin/bash

docker run --rm \
  --name sharebot-front \
  -p 3000:3000 \
  onionkim/sharebot-front:1.0
