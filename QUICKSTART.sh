#!/bin/bash
# Quick Start Guide for MedAssist AI

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}    MedAssist AI - Quick Start Guide    ${NC}"
echo -e "${GREEN}========================================${NC}\n"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo -e "${GREEN}✅ Node.js is installed:${NC} $(node --version)"
echo -e "${GREEN}✅ npm is installed:${NC} $(npm --version)\n"

# Setup Backend
echo -e "${YELLOW}Setting up Backend...${NC}"
cd backend
echo "Installing backend dependencies..."
npm install --silent

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Backend setup complete${NC}\n"
else
    echo -e "${RED}❌ Backend setup failed${NC}\n"
    exit 1
fi

cd ..

# Setup Frontend
echo -e "${YELLOW}Setting up Frontend...${NC}"
cd frontend
echo "Installing frontend dependencies..."
npm install --silent

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Frontend setup complete${NC}\n"
else
    echo -e "${RED}❌ Frontend setup failed${NC}\n"
    exit 1
fi

cd ..

# Instructions
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}   Setup Complete! Ready to Start    ${NC}"
echo -e "${GREEN}========================================${NC}\n"

echo -e "${YELLOW}📋 Next Steps:${NC}\n"

echo "1️⃣  Start the Backend (in one terminal):"
echo -e "   ${YELLOW}cd backend && npm start${NC}\n"

echo "2️⃣  Start the Frontend (in another terminal):"
echo -e "   ${YELLOW}cd frontend && npm start${NC}\n"

echo "3️⃣  Open your browser to: ${YELLOW}http://localhost:3000${NC}\n"

echo -e "${GREEN}ℹ️  Sample Queries Available:${NC}"
echo "   • What medications am I currently taking?"
echo "   • When is my next appointment scheduled?"
echo "   • What should I know about my allergies?"
echo "   • What are my recent lab results?"
echo "   • What health tips do you recommend for someone with my conditions?\n"

echo -e "${GREEN}✨ MedAssist AI is ready to improve healthcare! 🏥${NC}\n"
