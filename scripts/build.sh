#!/bin/bash

# Остановить выполнение при ошибке
set -e

# Путь до папки сборки
DIST_DIR="dist"

echo "📦 Remove previous build"

# Удаляем папку dist, если она существует
if [ -d "$DIST_DIR" ]; then
  rm -rf "$DIST_DIR"
  echo "🧹 $DIST_DIR folder deleted."
fi

echo "🔨 Building started..."

# Выполняем сборку
yarn run build

echo "✅ Build completed"