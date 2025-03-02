#!/bin/bash

# Component Sandbox Setup Script
set -e # Exit on error

echo "🚀 Setting up Component Sandbox..."

# Create backup of existing node_modules if it exists
if [ -d "node_modules" ]; then
  echo "📦 Backing up existing node_modules..."
  mv node_modules node_modules.bak
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install --legacy-peer-deps

# Create required directories
echo "📁 Creating required directories..."
mkdir -p dist
mkdir -p src/types

# Compile TypeScript files
echo "🔨 Compiling TypeScript files..."
npx tsc --project tsconfig.json

# Run dependency scan
echo "🔍 Scanning dependencies..."
npm run scan-deps

# Make main.js executable if it doesn't exist or is not up to date
if [ ! -f "src/main.js" ] || [ "src/main.ts" -nt "src/main.js" ]; then
  echo "🔄 Compiling main.ts to main.js..."
  npx tsc src/main.ts --outDir src --module commonjs --esModuleInterop true
fi

# Make preload.js executable if it doesn't exist or is not up to date
if [ ! -f "src/preload.js" ] || [ "src/preload.ts" -nt "src/preload.js" ]; then
  echo "🔄 Compiling preload.ts to preload.js..."
  npx tsc src/preload.ts --outDir src --module commonjs --esModuleInterop true
fi

echo "✅ Setup complete!"
echo ""
echo "To start the application quickly (one command):"
echo "$ npm run dev"
echo ""
echo "This will start both the webpack dev server and Electron app"
echo ""
echo "To build for production:"
echo "$ npm run build"
echo ""
echo "Starting the application now..."
npm run dev
