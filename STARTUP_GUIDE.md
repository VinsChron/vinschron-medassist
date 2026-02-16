# First-Time Startup Guide

Complete step-by-step walkthrough for getting MedAssist AI running for the first time.

## Time Required: ~5-10 minutes

## Step 1: Verify Prerequisites

Before starting, ensure you have:

```bash
# Check Node.js is installed
node --version
# ✅ Should be v14+ (v16+ recommended)

# Check npm is installed
npm --version
# ✅ Should be v6+ (v7+ recommended)

# Check git is installed (optional but recommended)
git --version
# ✅ Should show git version
```

**If any are missing:**
- Download Node.js from https://nodejs.org/ (includes npm)
- Download Git from https://git-scm.com/ (optional)

## Step 2: Navigate to Project

```bash
# Open terminal/PowerShell and navigate to project
cd "d:\VK 2026 JAN - MAR\IWU\AI Based Capstone Project\W5\PolicyPal\MedAssist-AI"

# Verify you're in the right place
dir  # Windows: should see backend, frontend, README.md, etc.
ls   # macOS/Linux: should see same files
```

## Step 3: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies (takes ~1-2 minutes)
npm install
# ✅ Should see: "added 110 packages"

# Verify .env file exists
type .env  # Windows
cat .env   # macOS/Linux
# ✅ Should see PORT=5000, NODE_ENV=development, etc.

# If .env doesn't exist:
# copy .env.example .env  (Windows)
# cp .env.example .env    (macOS/Linux)
```

## Step 4: Start Backend Server

```bash
# Make sure you're in the backend directory
cd backend  # If not already there

# Start the development server
npm run dev

# ✅ You should see:
# Server is running on port 5000
# No error messages

# Keep this terminal open and running
```

**If it fails:** See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

## Step 5: Verify Backend (Open NEW Terminal)

```bash
# Open a NEW terminal window/tab while backend is running
# DO NOT close the first terminal

# Test health endpoint
curl http://localhost:5000/api/health

# Or using PowerShell (Windows):
Invoke-WebRequest http://localhost:5000/api/health

# ✅ You should see JSON response:
# {"success":true,"status":"OK","timestamp":"...","uptime":...}
```

**If request fails:**
- Backend not running? Check first terminal for errors
- Port in use? See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

## Step 6: Frontend Setup (In NEW Terminal)

```bash
# Open a THIRD terminal window/tab
# Navigate to project root
cd "d:\VK 2026 JAN - MAR\IWU\AI Based Capstone Project\W5\PolicyPal\MedAssist-AI"

# Navigate to frontend
cd frontend

# Install dependencies (takes ~2-3 minutes)
npm install
# ✅ Should see: "added X packages"

# Verify .env.local exists
type .env.local  # Windows
cat .env.local   # macOS/Linux
# ✅ Should see REACT_APP_API_URL=http://localhost:5000

# If .env.local doesn't exist:
# copy .env.example .env.local  (Windows)
# cp .env.example .env.local    (macOS/Linux)
```

## Step 7: Start Frontend Server

```bash
# Make sure you're in the frontend directory
cd frontend  # If not already there

# Start the development server
npm start

# ✅ Browser should automatically open to http://localhost:3000
# If not, manually open: http://localhost:3000

# ✅ You should see:
# - MedAssist AI title
# - Patient selector dropdown
# - "Select a patient to begin" message
```

**If browser doesn't auto-open:**
- Browser might have blocked auto-open
- Manually open: http://localhost:3000

**If blank page:** See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

## Step 8: Test the Application

Now that both servers are running:

```
Terminal 1: Backend running on :5000
Terminal 2: (verification terminal - can close)
Terminal 3: Frontend running on :3000
```

### Test 1: Select a Patient

1. Open http://localhost:3000 in your browser
2. Click the patient dropdown
3. ✅ Should see:
   - patient_001 - John Doe
   - patient_002 - Sarah Johnson

### Test 2: Try a Sample Query

1. Select "patient_001 - John Doe"
2. Click one of the sample buttons:
   - "What medications am I currently taking?"
   - "When is my next appointment?"
   - "What are my allergies?"
   - "Show my last lab results"
   - "Health tips for my conditions"
3. ✅ Should see:
   - Loading spinner appears
   - Response loads in chat (takes 1-2 seconds)
   - Message appears in chat history

### Test 3: Type Custom Query

1. Make sure a patient is selected
2. Type in the message box: "What is my diagnosis?"
3. ✅ Should see:
   - Character count increases
   - Send button is clickable
   - Response appears after sending

### Test 4: Validation Works

1. Type just "Hi" (less than 3 characters)
2. ✅ Should see:
   - Send button is disabled (grayed out)
   - Red error message appears
   - Hit "What medications..." button to see different query

## Step 9: Explore the Code

Now that everything is running:

1. **Open the project** in VS Code:
```bash
code .
```

2. **Explore folder structure:**
   - `backend/src/` - Backend code
     - `routes/` - API endpoints
     - `middleware/` - Error handling, logging
     - `utils/` - Validation, custom errors
     - `data/` - Sample patient and query data
   - `frontend/src/` - Frontend React code
     - `components/` - Chatbot, PatientSelector
     - `services/` - API communication
     - `hooks/` - Custom React hooks
     - `utils/` - Validation utilities

3. **Read the documentation:**
   - [QUICKSTART.md](./QUICKSTART.md) - Quick reference
   - [README.md](./README.md) - Full overview
   - [DEVELOPMENT.md](./DEVELOPMENT.md) - Development guide
   - [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) - Detailed structure

## Step 10: Keep Servers Running

**Important:** Keep both terminals open while developing:

```
✅ DO:
- Keep backend server running in Terminal 1
- Keep frontend server running in Terminal 3
- Both will auto-reload when you save files

❌ DON'T:
- Close either terminal (stops the server)
- Edit .env files without restarting server
- Have multiple npm servers on same port
```

## Stopping the Servers

When you're done developing:

```bash
# In each terminal, press:
Ctrl+C

# Should see: ^C (on Windows)
# Should see: ^C or similar (on macOS/Linux)

# Terminal will be ready for new commands
```

## Next Steps

Congratulations! Your MedAssist AI application is running. 🎉

### What to explore:

1. **Test all features:**
   - Try different patients
   - Try different queries
   - Test validation

2. **Understand the code:**
   - Read [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)
   - Read [DEVELOPMENT.md](./DEVELOPMENT.md)
   - Review source code comments

3. **Make changes:**
   - Add new sample queries in `backend/src/data/queries.js`
   - Add new patients in `backend/src/data/patients.js`
   - Modify UI in `frontend/src/components/`

4. **Learn the architecture:**
   - Check [ARCHITECTURE.md](./ARCHITECTURE.md)
   - Review error handling in `backend/src/middleware/errorHandler.js`
   - Check validation in `frontend/src/utils/validation.js`

## Common Issues on First Run

### Issue: "Cannot find module 'express'"
```bash
cd backend
npm install
npm run dev
```

### Issue: "Port 5000 already in use"
```bash
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Then restart:
npm run dev
```

### Issue: "Blank page in browser"
```bash
# Frontend terminal:
npm cache clean --force
npm install
npm start
```

### Issue: "API Connection Error"
1. Verify backend is running: `curl http://localhost:5000/api/health`
2. Check frontend `.env.local` has `REACT_APP_API_URL=http://localhost:5000`
3. Restart both servers

**For more help:** See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

## Terminal Setup (Recommended)

For easier management, use one of these approaches:

### Approach 1: Separate Windows
- Window 1: Backend terminal
- Window 2: Frontend terminal
- Window 3: VS Code editor

### Approach 2: VS Code (Recommended)
- VS Code has built-in terminal
- Terminal → New Terminal (twice)
- Then same as below

### Approach 3: Terminal Tabs
- Tab 1: Backend
- Tab 2: Frontend
- Tab 3: Other commands

## You're All Set! 

Your complete healthcare AI application is now running locally with:

✅ Full-stack application (React + Express.js)
✅ Working chat interface
✅ Input validation
✅ Error handling
✅ Sample patient data
✅ Professional documentation

**Next:** Continue reading [DEVELOPMENT.md](./DEVELOPMENT.md) to learn about the codebase!

---

**Questions?** Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) or read the full [README.md](./README.md)

Happy coding! 🚀
