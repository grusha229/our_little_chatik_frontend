#!/bin/bash
set -e
DIST_DIR="dist"

echo "📦 Remove previous build"
if [ -d "$DIST_DIR" ]; then
  rm -rf "$DIST_DIR"
  echo "🧹 $DIST_DIR folder deleted."
fi

echo "📦 Install dependencies..."
yarn install

echo "🔨 Building started..."
yarn build

echo "✅ Build completed"