@echo off
REM ShopSphere Quick Start Script for Windows

echo.
echo 🚀 ShopSphere Setup Starting...
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    exit /b 1
)

for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo ✓ Node.js version: %NODE_VERSION%
echo.

REM Setup Server
echo 📦 Setting up server...
cd server
call npm install

echo.
echo 🔧 Setting up database...
call npm run setup-db

echo.
echo ✓ Server setup complete!
echo.

REM Setup Client
cd ..\client
echo 📦 Setting up client...
call npm install

echo.
echo ✓ Client setup complete!
echo.

cd ..

echo ═══════════════════════════════════════════════════════════
echo ✅ ShopSphere Setup Complete!
echo ═══════════════════════════════════════════════════════════
echo.
echo To start the application:
echo.
echo Terminal 1 - Start Backend:
echo   cd server
echo   npm run dev
echo.
echo Terminal 2 - Start Frontend:
echo   cd client
echo   npm run dev
echo.
echo Frontend URL: http://localhost:5173
echo API URL: http://localhost:5000/api
echo.
echo 📖 For more details, see DATABASE_SETUP.md
echo ═══════════════════════════════════════════════════════════
echo.
pause
