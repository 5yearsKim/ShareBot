#!/bin/bash

# Loop through all .tar files and load them into Docker
for tarfile in docker_imgs/*.tar; do
    echo "Loading $tarfile into Docker..."
    docker load -i "$tarfile"
    if [ $? -eq 0 ]; then
        echo "$tarfile loaded successfully."
    else
        echo "Failed to load $tarfile."
    fi
done
