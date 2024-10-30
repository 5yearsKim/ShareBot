#!/bin/bash

# Function to handle cleanup on Ctrl+C
cleanup() {
    echo "Interrupt received, stopping all operations..."
    exit 1
}

# Trap SIGINT (Ctrl+C) and call the cleanup function
trap cleanup SIGINT

# Declare an associative array to hold image and target pairs
declare -A image_infos=(
    ["onionkim/sharebot-back:1.0"]="docker_imgs/sharebot_back.tar"
    ["onionkim/sharebot-front:1.0"]="docker_imgs/sharebot_front.tar"
    ["onionkim/sharebot-engine:1.0"]="docker_imgs/sharebot_engine.tar"
)

# Loop through the associative array
for image in "${!image_infos[@]}"; do
    target="${image_infos[$image]}"
    
    # Check if the tar file already exists
    if [ -f "$target" ]; then
        echo "$target already exists, skipping..."
    else
        echo "Saving $image to $target"
        docker save -o "$target" "$image"
    fi
done
