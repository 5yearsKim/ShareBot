#!/bin/bash

docker buildx build --platform=linux/amd64 -t onionkim/sharebot-back:1.0 . --load