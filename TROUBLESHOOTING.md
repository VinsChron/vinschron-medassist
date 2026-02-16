# Troubleshooting Guide - MedAssist AI

Common issues and their solutions.

## Table of Contents

- [Installation Issues](#installation-issues)
- [Backend Issues](#backend-issues)
- [Frontend Issues](#frontend-issues)
- [API Communication Issues](#api-communication-issues)
- [Environment Issues](#environment-issues)
- [Performance Issues](#performance-issues)
- [Getting Help](#getting-help)

---

## Installation Issues

### Issue: `npm install` fails

**Symptoms:**
```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
```

**Solution:**
```bash
# Use legacy peer deps (temporary fix)
npm install --legacy-peer-deps

# Or use npm 7+ flag
npm install --no-audit

# Or clear cache and retry
npm cache clean --force
npm install
```

### Issue: Python version error during installation

**Symptoms:**
```
gyp ERR! configure error
node-gyp rebuild failed
```

**Solution:**
- Install Python 3.8+ (check `python --version`)
- Windows: Ensure Visual Studio Build Tools installed
- macOS: Run `xcode-select --install`

```bash
# Then retry
npm install
```

### Issue: Permission denied on Linux/macOS

**Symptoms:**
```
npm ERR! code EACCES
npm ERR! syscall mkdir
```

**Solution:**
```bash
# Fix npm permissions
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH

# Then retry
npm install
```

---

## Backend Issues

### Issue: Port 5000 already in use

**Symptoms:**
```
Error: listen EADDRINUSE :::5000
```

**Solution:**

**Windows (PowerShell):**
```powershell
# Find process using port 5000
netstat -ano | findstr :5000

# Kill process (replace PID with actual PID)
taskkill /PID <PID> /F

# Or use different port
SET PORT=5001
npm start
```

**Linux/macOS:**
```bash
# Find process using port 5000
lsof -i :5000

# Kill process (replace PID with actual PID)
kill -9 <PID>

# Or use different port
PORT=5001 npm start
```

### Issue: Backend server won't start

**Symptoms:**
```
Cannot find module 'express'
```

**Solution:**
```bash
# Check node_modules exists
cd backend
ls node_modules

# If not, reinstall
rm package-lock.json
npm install

# Check Node version
node --version  # Should be v14+

# Check if src/index.js exists
ls src/index.js
```

### Issue: 404 Not Found on health check

**Symptoms:**
```
GET http://localhost:5000/api/health
404 Not Found
```

**Solution:**
```bash
# 1. Verify server is running
# You should see startup message in terminal

# 2. Check correct endpoint
# It's /api/health, not /health

# 3. Try: curl http://localhost:5000/api/health
curl http://localhost:5000/api/health

# 4. Check logs for errors
# Look for error messages in terminal output
```

### Issue: Database connection errors

**Symptoms:**
```
Error connecting to database
ValidationError: Patient not found
```

**Solution:**
```bash
# Check patient ID format
# Must be: patient_001, patient_002, etc.

# Check backend/src/data/patients.js exists
ls src/data/patients.js

# Try with valid patient ID
curl -X POST http://localhost:5000/api/query \
  -H "Content-Type: application/json" \
  -d '{"query":"What medications?","patientId":"patient_001"}'
```

### Issue: CORS errors

**Symptoms:**
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution:**

1. **Check .env file:**
```bash
# Verify CORS_ORIGIN is set correctly
cat backend/.env

# Should have:
CORS_ORIGIN=http://localhost:3000
```

2. **Verify frontend URL matches:**
```bash
# Frontend should be running on localhost:3000
# Not 127.0.0.1:3000 or localhost:3001
```

3. **Restart both servers:**
```bash
# Terminal 1: Kill and restart backend
npm run dev

# Terminal 2: Kill and restart frontend
npm start
```

---

## Frontend Issues

### Issue: `npm start` shows blank page

**Symptoms:**
- Browser shows blank white page
- Console shows errors

**Solution:**

1. **Check browser console for errors:**
   - Press F12 → Console tab
   - Look for error messages

2. **Clear cache:**
```bash
# Clear browser cache (Ctrl+Shift+Del on Windows/Linux)
# Or clear node_modules cache:
cd frontend
rm -rf node_modules package-lock.json
npm install
npm start
```

3. **Check .env.local:**
```bash
# Verify file exists
ls .env.local

# Should have:
REACT_APP_API_URL=http://localhost:5000
REACT_APP_API_TIMEOUT=10000
```

### Issue: Frontend won't compile

**Symptoms:**
```
Failed to compile
SyntaxError: Unexpected token
```

**Solution:**

1. **Check for syntax errors:**
   - The error message shows file and line number
   - Fix the syntax error in that file

2. **Common issues:**
```javascript
// Missing closing brace
const Component = () => {
  return <div>; // ❌ Wrong - missing }

// Wrong import
import Button from 'react'; // ❌ Should be from './Button'

// JSX syntax error
<Component prop={value> // ❌ Should be prop={value}
```

3. **Try restart:**
```bash
# Stop the server (Ctrl+C)
# Clear cache
npm cache clean --force
# Reinstall
rm -rf node_modules package-lock.json
npm install
# Restart
npm start
```

### Issue: Module not found errors

**Symptoms:**
```
Module not found: Can't resolve './api' in 'src/services'
```

**Solution:**

1. **Check file exists:**
```bash
# If error is about './api'
ls src/services/api.js

# If not found, check structure
ls src/services/

# Check imports match actual paths
```

2. **Check import statements:**
```javascript
// ❌ Wrong
import { api } from '../services/api.js';

// ✅ Correct
import { queryService } from '../services/api';
```

3. **Reinstall dependencies:**
```bash
npm install
```

### Issue: State not updating

**Symptoms:**
- Component doesn't re-render
- Data appears in console but not on screen

**Solution:**

```javascript
// ❌ Wrong - Direct mutation
state.messages.push(newMessage);

// ✅ Correct - Create new array
setState([...state, newMessage]);

// ❌ Wrong - Missing dependency
useEffect(() => {
  loadData();
}, []); // Should include dependencies

// ✅ Correct
useEffect(() => {
  loadData();
}, [dependency]);
```

---

## API Communication Issues

### Issue: API request hangs or times out

**Symptoms:**
- Request takes > 10 seconds
- Loading indicator spins indefinitely

**Solution:**

1. **Check backend is running:**
```bash
# In backend directory
npm run dev

# Or try health check
curl http://localhost:5000/api/health
```

2. **Check firewall:**
   - Windows: Check firewall settings
   - macOS: System Preferences → Security & Privacy
   - Linux: Check firewall rules

3. **Check timeout in .env:**
```bash
# frontend/.env.local
REACT_APP_API_TIMEOUT=10000  # 10 seconds

# Increase if queries take longer
REACT_APP_API_TIMEOUT=30000  # 30 seconds
```

### Issue: Cannot reach API from frontend

**Symptoms:**
```
Error: Network Error
Failed to reach http://localhost:5000
```

**Solution:**

1. **Verify backend is running:**
```bash
# Try this in another terminal
curl http://localhost:5000/api/health

# Should return JSON response
```

2. **Check API URL in .env.local:**
```bash
# Should be:
REACT_APP_API_URL=http://localhost:5000

# Not:
REACT_APP_API_URL=localhost:5000  # Missing http://
REACT_APP_API_URL=http://127.0.0.1:5000  # Use localhost
```

3. **Check CORS settings:**
```bash
# backend/.env
CORS_ORIGIN=http://localhost:3000

# Should match frontend URL exactly
```

### Issue: API returns 400 Bad Request

**Symptoms:**
```
Error: Request failed with status code 400
```

**Solution:**

1. **Check request format:**
```javascript
// ❌ Wrong
const response = await axios.get('/api/query', {
  query: 'What medications?',
  patientId: 'patient_001'
});

// ✅ Correct - POST with body
const response = await axios.post('/api/query', {
  query: 'What medications?',
  patientId: 'patient_001'
});
```

2. **Validate input:**
```javascript
// Query must be 3-500 characters
// PatientId must be format: patient_XXX

// Test with curl
curl -X POST http://localhost:5000/api/query \
  -H "Content-Type: application/json" \
  -d '{"query":"What medications?","patientId":"patient_001"}'
```

3. **Check response body:**
```bash
# Add error logging
try {
  const response = await api.post('/api/query', data);
} catch (error) {
  console.error('Response:', error.response.data);
}
```

### Issue: API returns 500 Internal Server Error

**Symptoms:**
```
Error: Request failed with status code 500
```

**Solution:**

1. **Check backend logs:**
   - Look at terminal where `npm run dev` is running
   - Error message should show the issue

2. **Common causes:**
```javascript
// Missing error handling
router.get('/', (req, res) => {
  const data = null;
  return data.property; // ❌ Throws error, should handle
});

// Wrong function call
const result = processQuery(null); // ❌ processQuery can't handle null
```

3. **Test with valid data:**
```bash
curl -X POST http://localhost:5000/api/query \
  -H "Content-Type: application/json" \
  -d '{"query":"Test","patientId":"patient_001"}'
```

---

## Environment Issues

### Issue: Environment variables not loading

**Symptoms:**
```
process.env.REACT_APP_API_URL is undefined
```

**Solution:**

1. **Frontend - Check .env.local:**
```bash
# File must exist in frontend directory
ls frontend/.env.local

# Must have REACT_APP_ prefix
REACT_APP_API_URL=http://localhost:5000  # ✅
API_URL=http://localhost:5000             # ❌ Won't work in React

# Restart server after changing
npm start
```

2. **Backend - Check .env:**
```bash
# File must exist in backend directory
ls backend/.env

# Load with dotenv
require('dotenv').config();
console.log(process.env.PORT);

# Restart server after changing
npm start
```

3. **Verify .env is not in .gitignore:**
   - If .env is in .gitignore, you must create it locally
   - Use .env.example as template
```bash
cp backend/.env.example backend/.env
# Edit .env with your values
```

### Issue: Wrong environment in production

**Symptoms:**
- Debug logs appearing in production
- Development URLs being used

**Solution:**

```bash
# Set NODE_ENV correctly
NODE_ENV=production npm start

# Or in .env file
NODE_ENV=production

# Check in code
if (process.env.NODE_ENV === 'production') {
  // Use production settings
}
```

---

## Performance Issues

### Issue: Application is slow

**Symptoms:**
- Takes > 3 seconds to load
- Typing in input is sluggish

**Solution:**

1. **Backend optimization:**
```bash
# Check if queries take too long
# Measure with curl
time curl http://localhost:5000/api/queries

# Should be < 1 second
```

2. **Frontend optimization:**
```javascript
// Avoid unnecessary re-renders
const MemoizedComponent = React.memo(Component);

// Lazy load heavy components
const HeavyComponent = React.lazy(() => import('./Heavy'));

// Use useCallback for stable functions
const memoizedCallback = useCallback(() => {
  // Logic
}, [dependencies]);
```

3. **Network tab check:**
   - F12 → Network tab
   - Look for slow requests
   - Check bundle size

### Issue: High memory usage

**Symptoms:**
- Browser becomes unresponsive
- High CPU usage

**Solution:**

```javascript
// Check for memory leaks
useEffect(() => {
  const handler = () => { /* ... */ };
  
  // ❌ Wrong - never removes listener
  window.addEventListener('resize', handler);
  
  // ✅ Correct - removes listener on cleanup
  window.addEventListener('resize', handler);
  return () => window.removeEventListener('resize', handler);
}, []);

// Check for infinite loops
while (true) {
  // ❌ Will hang
}
```

---

## Getting Help

### Before asking for help

1. **Read the documentation:**
   - README.md
   - DEVELOPMENT.md
   - PROJECT_STRUCTURE.md

2. **Check the error message:**
   - Error messages usually indicate the problem
   - Check line number mentioned

3. **Search for similar issues:**
   - Google the error message
   - Check GitHub issues

### Collecting information for help

When asking for help, provide:

```markdown
**Environment:**
- OS: Windows 10 / macOS / Linux
- Node.js: v14 / v16 / v18
- npm: v6 / v7 / v8

**Problem:**
[Description of the issue]

**Error Message:**
[Full error message from console/terminal]

**Steps to Reproduce:**
1. ...
2. ...

**What I've tried:**
- [Solution 1]
- [Solution 2]
```

### Where to ask

1. **GitHub Issues** - For bugs and features
2. **Documentation** - For how-to questions
3. **Team Chat** - For quick questions
4. **Code Review** - For architecture advice

---

**Still stuck?**

1. Restart both servers (kill all Node processes)
2. Clear all caches (npm, browser)
3. Reinstall dependencies
4. Check file permissions
5. Verify all .env files exist and are correct

Good luck! 🚀
