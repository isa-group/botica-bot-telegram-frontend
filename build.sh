#!/bin/bash

IMAGE_TAG=$(npm pkg get imageTag | tr -d '"')

echo "Building Docker image with tag $IMAGE_TAG..."
if ! docker build -t "$IMAGE_TAG" .; then
  echo "Docker build failed. Exiting."
  exit 1
fi

echo "Docker image built successfully with tag $IMAGE_TAG."
