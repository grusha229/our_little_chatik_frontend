#!/bin/bash
set -e
DIST_DIR="dist"

echo "📦 Remove previous build"
if [ -d "$DIST_DIR" ]; then
  rm -rf "$DIST_DIR"
  echo "🧹 $DIST_DIR folder deleted."
fi

echo "📦 Install dependencies..."
npm install

echo "🔨 Building started..."
npm run build

echo "✅ Build completed"