#!/bin/bash

# ShopSphere Quick Start Script

echo "🚀 ShopSphere Setup Starting..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✓ Node.js version: $(node -v)"
echo ""

# Setup Server
echo "📦 Setting up server..."
cd server
npm install

echo ""
echo "🔧 Setting up database..."
npm run setup-db

echo ""
echo "✓ Server setup complete!"
echo ""

# Setup Client
cd ../client
echo "📦 Setting up client..."
npm install

echo ""
echo "✓ Client setup complete!"
echo ""

cd ..

echo "═══════════════════════════════════════════════════════════"
echo "✅ ShopSphere Setup Complete!"
echo "═══════════════════════════════════════════════════════════"
echo ""
echo "To start the application:"
echo ""
echo "Terminal 1 - Start Backend:"
echo "  cd server"
echo "  npm run dev"
echo ""
echo "Terminal 2 - Start Frontend:"
echo "  cd client"
echo "  npm run dev"
echo ""
echo "Frontend URL: http://localhost:5173"
echo "API URL: http://localhost:5000/api"
echo ""
echo "📖 For more details, see DATABASE_SETUP.md"
echo "═══════════════════════════════════════════════════════════"
