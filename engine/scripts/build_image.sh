#!/bin/bash

docker buildx build --platform linux/amd64 -t onionkim/sharebot-engine:1.0 . --load
