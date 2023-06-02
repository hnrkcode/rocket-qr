#!/bin/bash

# Check if the argument is provided
if [[ -z "$1" ]]; then
  echo "Please provide the version bump type: major, minor, or patch."
  exit 1
fi

# Read the current version from manifest.json
current_version=$(jq -r '.version' ./static/manifest.json)

# Split the version into its parts
IFS='.' read -ra version_parts <<< "$current_version"

# Determine the version bump type
case "$1" in
  major)
    ((version_parts[0]++))
    version_parts[1]=0
    version_parts[2]=0
    ;;
  minor)
    ((version_parts[1]++))
    version_parts[2]=0
    ;;
  patch)
    ((version_parts[2]++))
    ;;
  *)
    echo "Invalid version bump type. Please choose major, minor, or patch."
    exit 1
    ;;
esac

# Join the version parts back together
new_version=$(IFS='.'; echo "${version_parts[*]}")

# Update the version in manifest.json using jq
jq --arg new_version "$new_version" '.version = $new_version' ./static/manifest.json > tmp.json && mv tmp.json ./static/manifest.json

# Update the version in package.json using jq
jq --arg new_version "$new_version" '.version = $new_version' package.json > tmp.json && mv tmp.json package.json

npm install

# Commit the changes
git add ./static/manifest.json package.json package-lock.json
git commit -m "Bump version to $new_version"

# Tag the commit
commit_hash=$(git rev-parse HEAD)
git tag -a "v$new_version" $commit_hash -m "Version $new_version"