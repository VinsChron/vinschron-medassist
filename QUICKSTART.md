# Quick Start Guide - MedAssist AI

Get up and running in 5 minutes.

## Prerequisites

- Node.js v14+ ([Download](https://nodejs.org/))
- npm v6+ (comes with Node.js)
- Git (for version control)

## Installation

```bash
# 1. Navigate to the project directory
cd MedAssist-AI

# 2. Backend setup
cd backend
npm install
cp .env.example .env

# 3. Frontend setup
cd ../frontend
npm install
cp .env.example .env.local
```

## Running the Application

### Option 1: Separate Terminals (Recommended)

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend (in new terminal)
cd frontend
npm start
```

### Option 2: Single Terminal

```bash
# From project root directory
npm install -g concurrently

# Then run:
concurrently "cd backend && npm run dev" "cd frontend && npm start"
```

## Verify It's Working

1. **Backend health check:**
```bash
curl http://localhost:5000/api/health
# ✅ Should see: {"success":true,"status":"OK","timestamp":"..."}
```

2. **Frontend is running:**
- Open browser to http://localhost:3000
- ✅ Should see the MedAssist AI chat interface

3. **Test a query:**
- Select "patient_001" from dropdown
- Click "What medications am I currently taking?"
- ✅ Should get a response

## Quick Commands

```bash
# Start backend development server (auto-reload)
cd backend && npm run dev

# Start frontend development server (hot reload)
cd frontend && npm start

# Build frontend for production
cd frontend && npm run build

# Check for dependency vulnerabilities
npm audit

# View project structure
cat PROJECT_STRUCTURE.md

# View full documentation
cat README.md

# Get development help
cat DEVELOPMENT.md

# Troubleshoot problems
cat TROUBLESHOOTING.md
```

## Sample Patients

Two sample patients available for testing:

### Patient 1: John Doe (patient_001)
- Age: 45
- Conditions: Hypertension, Type 2 Diabetes
- Medications: Lisinopril, Metformin, Metoprolol
- Allergies: Penicillin

### Patient 2: Sarah Johnson (patient_002)
- Age: 38
- Conditions: Hypothyroidism
- Medications: Levothyroxine, Vitamin D3
- Allergies: Sulfonamides

## Sample Queries

Try these queries:

- "What medications am I currently taking?"
- "When is my next appointment scheduled?"
- "What are my current allergies?"
- "What were my last lab results?"
- "What health tips do you have for me?"

## Environment Variables

### Backend (.env)
```
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
LOG_LEVEL=info
```

### Frontend (.env.local)
```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_API_TIMEOUT=10000
REACT_APP_DEBUG=false
REACT_APP_LOG_LEVEL=info
```

## Key Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/health` | Check server status |
| GET | `/api/queries` | Get all sample queries |
| GET | `/api/patients/list` | List available patients |
| GET | `/api/patients/:patientId` | Get patient details |
| POST | `/api/query` | Process a medical query |

## File Structure
```
MedAssist-AI/
├── backend/
│   ├── src/
│   │   ├── index.js              # Server entry point
│   │   ├── routes/               # API endpoints
│   │   ├── middleware/           # Middleware (errors, logging)
│   │   ├── utils/                # Utilities (validation, errors)
│   │   ├── data/                 # Mock data
│   │   └── config/               # Configuration
│   ├── .env                       # Environment variables
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.js                # Root component
│   │   ├── components/           # React components
│   │   ├── services/             # API service
│   │   ├── hooks/                # Custom hooks
│   │   └── utils/                # Utilities
│   ├── .env.local                # Environment variables
│   └── package.json
├── README.md                      # Full documentation
├── DEVELOPMENT.md                 # Development guide
├── CONTRIBUTING.md                # Contribution guidelines
└── TROUBLESHOOTING.md            # Problem solving

```

## Troubleshooting

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5000
kill -9 <PID>
```

### Module Not Found
```bash
npm install
npm cache clean --force
```

### CORS Error
```bash
# Verify .env files
cat backend/.env
cat frontend/.env.local

# Should have matching URLs:
# Backend: CORS_ORIGIN=http://localhost:3000
# Frontend: REACT_APP_API_URL=http://localhost:5000
```

### Blank Page/Won't Compile
```bash
rm -rf node_modules package-lock.json
npm install
npm start
```

## Need Help?

- **Full Guide:** Read [README.md](./README.md)
- **Development:** Check [DEVELOPMENT.md](./DEVELOPMENT.md)
- **Issues:** Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
- **Contributing:** See [CONTRIBUTING.md](./CONTRIBUTING.md)
- **Project Layout:** Review [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)

## What's Next?

1. ✅ Run the application locally
2. ✅ Test with sample queries
3. 🔄 Read [DEVELOPMENT.md](./DEVELOPMENT.md) for development guidelines
4. 🔄 Explore the codebase structure
5. 🔄 Check [ARCHITECTURE.md](./ARCHITECTURE.md) for system design
6. 🔄 Review [CONTRIBUTING.md](./CONTRIBUTING.md) before making changes

---

**Happy developing! 🚀**

For detailed information, see the full documentation files.
