# 📥 Installation Guide - MedAssist AI

Complete step-by-step guide to install and run MedAssist AI on your system.

## 🔍 Prerequisites

Before you begin, ensure you have the following installed:

### Required
- **Node.js** (v14.0 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) - [Verify](https://nodejs.org/)

### Optional
- **Git** (for cloning repository)
- **Code Editor** (VS Code recommended)

### System Requirements
- **OS**: Windows, macOS, or Linux
- **RAM**: Minimum 2GB (4GB recommended)
- **Disk Space**: Minimum 500MB
- **Ports**: 3000 (Frontend), 5000 (Backend) must be available

## ✅ Verify Prerequisites

### Check Node.js Installation

**Windows:**
```cmd
node --version
npm --version
```

**macOS/Linux:**
```bash
node --version
npm --version
```

Expected output:
```
v16.x.x or higher
8.x.x or higher
```

If commands are not found, download and install Node.js from https://nodejs.org/

## 📦 Installation Steps

### Option 1: Automated Setup (Windows)

1. Navigate to the MedAssist-AI folder
2. Double-click `QUICKSTART.bat`
3. Wait for installation to complete
4. Follow the on-screen instructions

### Option 2: Automated Setup (macOS/Linux)

1. Navigate to the MedAssist-AI folder
2. Run in terminal:
   ```bash
   chmod +x QUICKSTART.sh
   ./QUICKSTART.sh
   ```
3. Wait for installation to complete
4. Follow the on-screen instructions

### Option 3: Manual Setup

#### Step 1: Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Verify installation
npm list express

# You should see express listed
```

#### Step 2: Frontend Setup

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Verify installation
npm list react

# You should see react listed
```

#### Step 3: Verify Installation

Backend:
```bash
cd backend
npm start
```

You should see:
```
🏥 MedAssist AI Backend running on http://localhost:5000
```

Frontend (in new terminal):
```bash
cd frontend
npm start
```

Browser should automatically open to `http://localhost:3000`

## ▶️ Running the Application

### Two-Terminal Setup (Recommended)

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

Output indicates:
```
🏥 MedAssist AI Backend running on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

Output indicates:
```
Compiled successfully!
Local:            http://localhost:3000
```

The frontend will automatically open in your browser.

## 🔧 Troubleshooting

### Issue: "Command not found: node"
**Solution:**
1. Install Node.js from https://nodejs.org/
2. Restart your terminal/computer
3. Verify installation: `node --version`

### Issue: "Port 5000 already in use"
**Solution - Windows:**
```cmd
# Find process on port 5000
netstat -ano | findstr :5000

# Kill the process (replace <PID> with the actual PID)
taskkill /PID <PID> /F
```

**Solution - macOS/Linux:**
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

### Issue: "Port 3000 already in use"
**Solution - Windows:**
```cmd
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Solution - macOS/Linux:**
```bash
lsof -ti:3000 | xargs kill -9
```

### Issue: "npm ERR! code ENOENT"
**Solution:**
1. Delete `node_modules` folder: `rm -rf node_modules`
2. Delete lock file: `rm package-lock.json` (Windows: `del package-lock.json`)
3. Run: `npm install`

### Issue: "Backend connection failed"
**Solution:**
1. Ensure backend server is running: `npm start` in backend folder
2. Verify http://localhost:5000/api/health returns success
3. Check browser console for CORS errors
4. Clear browser cache and reload

### Issue: "Module not found" or "Cannot find module"
**Solution:**
```bash
# Delete node_modules
rm -rf node_modules

# Clear npm cache
npm cache clean --force

# Reinstall
npm install
```

### Issue: React scripts not found
**Frontend only:**
```bash
cd frontend
npm install react-scripts
npm install
```

### Issue: "EACCES: permission denied"
**Solution - macOS/Linux:**
```bash
# Use sudo for global installs
sudo npm install -g npm

# Or change npm directory permissions
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
```

### Issue: Styling not applying correctly
**Solution:**
1. Hard refresh browser: 
   - Windows/Linux: `Ctrl+Shift+R`
   - macOS: `Cmd+Shift+R`
2. Clear browser cache completely
3. Close and reopen browser

### Issue: "Cannot GET /"
**Solution:**
1. Ensure frontend is running (check Terminal 2)
2. Check you're accessing http://localhost:3000 (not 5000)
3. Check browser console for errors

## 🧪 Testing the Installation

### Backend Test

```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{"status":"Backend is running successfully"}
```

### Frontend Test

1. Open browser: http://localhost:3000
2. You should see the MedAssist AI interface
3. Patient selector dropdown should load with names
4. Sample query buttons should be visible

### Full Integration Test

1. Backend running on port 5000 ✅
2. Frontend running on port 3000 ✅
3. Can see patient profiles ✅
4. Can click sample queries ✅
5. Receive responses in chat ✅

If any step fails, check the troubleshooting section above.

## 📋 File Structure Verification

After successful installation, you should have:

```
MedAssist-AI/
├── backend/
│   ├── node_modules/          ✅ (created by npm install)
│   ├── package-lock.json      ✅ (created by npm install)
│   ├── package.json
│   ├── server.js
│   ├── .env
│   └── README.md
│
├── frontend/
│   ├── node_modules/          ✅ (created by npm install)
│   ├── package-lock.json      ✅ (created by npm install)
│   ├── package.json
│   ├── public/
│   ├── src/
│   └── README.md
│
├── README.md
├── QUICKSTART.sh
├── QUICKSTART.bat
└── INSTALLATION.md
```

✅ = Files created during `npm install`

## 🚀 Environment Configuration

### Backend (.env file)

Already configured at `backend/.env`:
```
PORT=5000
NODE_ENV=development
```

### Frontend (package.json proxy)

Already configured in `frontend/package.json`:
```json
"proxy": "http://localhost:5000"
```

## 🔐 Security Notes for Development

Current setup is **for development/demo only**. Before production:

- [ ] Enable HTTPS/TLS
- [ ] Implement authentication
- [ ] Implement authorization
- [ ] Use environment variables for secrets
- [ ] Implement rate limiting
- [ ] Add input validation
- [ ] Use real database with encryption
- [ ] Implement audit logging
- [ ] Set up monitoring and alerting
- [ ] Regular security updates

## 📊 Verification Checklist

- [ ] Node.js version 14+ installed
- [ ] npm version 6+ installed
- [ ] Both `npm install` completed without errors
- [ ] Backend starts without errors on port 5000
- [ ] Frontend compiles successfully on port 3000
- [ ] Browser loads http://localhost:3000
- [ ] Patient selector shows at least 2 patients
- [ ] Sample query buttons visible
- [ ] Can send queries and receive responses
- [ ] No console errors in browser or terminal

## 📞 Getting Help

1. **Check the troubleshooting section** above
2. **Review console output** - error messages are usually clear
3. **Check port conflicts** - 3000 and 5000 must be available
4. **Verify Node.js/npm** - run `node --version` and `npm --version`
5. **Clear cache** - delete node_modules and reinstall
6. **Restart services** - kill and restart both servers

## 🎓 Next Steps After Installation

1. ✅ **Understand the Application**
   - Read main [README.md](README.md)
   - Review [Backend README](backend/README.md)
   - Review [Frontend README](frontend/README.md)

2. 🧪 **Test the Features**
   - Try all 5 sample queries
   - Switch between patient profiles
   - Test custom queries

3. 📚 **Learn the APIs**
   - Review API endpoints in backend README
   - Test endpoints with curl or Postman
   - Understand request/response format

4. 🔧 **Customize the Application**
   - Add more sample queries
   - Modify styling
   - Extend functionality

5. 🚀 **Deploy the Application**
   - Build frontend: `npm run build`
   - Learn about deployment options
   - Set up production environment

## 📖 Additional Resources

- [Node.js Documentation](https://nodejs.org/docs/)
- [npm Documentation](https://docs.npmjs.com/)
- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [cURL Tutorial](https://curl.se/docs/manual.html)

---

**Installation Complete! Ready to improve healthcare with AI.** 🏥✨
