@echo off
REM Quick Start Guide for MedAssist AI on Windows

echo ========================================
echo    MedAssist AI - Quick Start Guide
echo ========================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js is installed: & node --version
echo npm is installed: & npm --version
echo.

REM Setup Backend
echo Setting up Backend...
cd backend
echo Installing backend dependencies...
call npm install --silent

if %errorlevel% neq 0 (
    echo ERROR: Backend setup failed
    pause
    exit /b 1
)

echo Backend setup complete.
echo.
cd ..

REM Setup Frontend
echo Setting up Frontend...
cd frontend
echo Installing frontend dependencies...
call npm install --silent

if %errorlevel% neq 0 (
    echo ERROR: Frontend setup failed
    pause
    exit /b 1
)

echo Frontend setup complete.
echo.
cd ..

REM Instructions
echo ========================================
echo    Setup Complete! Ready to Start
echo ========================================
echo.

echo Next Steps:
echo.
echo 1. Start the Backend (in one terminal):
echo    cd backend ^&^& npm start
echo.
echo 2. Start the Frontend (in another terminal):
echo    cd frontend ^&^& npm start
echo.
echo 3. Open your browser to: http://localhost:3000
echo.

echo Sample Queries Available:
echo   * What medications am I currently taking?
echo   * When is my next appointment scheduled?
echo   * What should I know about my allergies?
echo   * What are my recent lab results?
echo   * What health tips do you recommend for someone with my conditions?
echo.

echo MedAssist AI is ready to improve healthcare!
echo.
pause
