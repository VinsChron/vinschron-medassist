# 🚀 Development Guide - MedAssist AI

Complete guide for developers working on the MedAssist AI project.

## Table of Contents

- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Code Standards](#code-standards)
- [Backend Development](#backend-development)
- [Frontend Development](#frontend-development)
- [Git Workflow](#git-workflow)
- [Testing](#testing)
- [Debugging](#debugging)
- [Performance](#performance)
- [Common Tasks](#common-tasks)

---

## Development Setup

### Initial Setup

```bash
# Clone repository
git clone <repository-url>
cd MedAssist-AI

# Backend setup
cd backend
npm install
cp .env.example .env
# Edit .env if needed

# Frontend setup
cd ../frontend
npm install
cp .env.example .env.local
# Edit .env.local if needed
```

### Running Development Servers

```bash
# Terminal 1: Backend with auto-reload
cd backend
npm run dev

# Terminal 2: Frontend with hot reload
cd frontend
npm start

# Terminal 3: Optional - Run both with concurrently
npm install -g concurrently
concurrently "cd backend && npm run dev" "cd frontend && npm start"
```

---

## Code Standards

### JavaScript/React

**Naming Conventions:**
```javascript
// Variables and functions: camelCase
const userName = 'John';
const getUserData = () => {...};

// Classes/Components: PascalCase
class UserService {...}
const ChatComponent = () => {...};

// Constants: UPPER_SNAKE_CASE
const MAX_RETRY_ATTEMPTS = 3;
const API_TIMEOUT = 10000;

// Private variables: _leading underscore
const _internalHelper = () => {...};
```

**File Structure:**
```javascript
// 1. Imports
import React from 'react';
import { service } from '../services/api';

// 2. Constants
const COMPONENT_NAME = 'ChatBox';

// 3. Component/Class definition
export default function ChatBox() {
  // Implementation
}

// 4. Exports
export { ChatBox };
```

**Comments:**
```javascript
// Use comments for WHY, not WHAT
// ❌ BAD: Increment counter
counter++;

// ✅ GOOD: Increment retry counter after failed attempt
counter++;

// Use JSDoc for functions
/**
 * Validates user input
 * @param {string} input - The user input to validate
 * @returns {boolean} True if valid, false otherwise
 */
function validateInput(input) {
  // Implementation
}
```

---

## Backend Development

### Project Structure

```
backend/src/
├── index.js              # Server entry point
├── config/
│   └── index.js         # Configuration
├── routes/
│   ├── health.js        # Health check
│   ├── queries.js       # Query endpoints
│   └── patients.js      # Patient endpoints
├── middleware/
│   ├── errorHandler.js  # Error handling
│   └── requestLogger.js # Logging
├── utils/
│   ├── errors.js        # Custom errors
│   ├── validators.js    # Validation
│   └── logger.js        # Logger
└── data/
    ├── patients.js      # Patient data
    └── queries.js       # Query data
```

### Adding a New Route

1. **Create route file** in `src/routes/`:

```javascript
// src/routes/newFeature.js
const router = require('express').Router();
const { asyncHandler } = require('../middleware/errorHandler');
const { ValidationError } = require('../utils/errors');

router.get('/', asyncHandler((req, res) => {
  // Handler logic
}));

module.exports = router;
```

2. **Register in** `src/index.js`:

```javascript
const newFeatureRoutes = require('./src/routes/newFeature');
app.use('/api/new-feature', newFeatureRoutes);
```

### Error Handling Pattern

```javascript
const { asyncHandler } = require('../middleware/errorHandler');
const { ValidationError, NotFoundError } = require('../utils/errors');

router.post('/', asyncHandler((req, res) => {
  // Validate
  if (!req.body.data) {
    throw new ValidationError('Data is required');
  }

  // Check existence
  const item = findItem(req.body.id);
  if (!item) {
    throw new NotFoundError('Item');
  }

  // Process
  res.json({ success: true, data: item });
}));
```

### Logging

```javascript
const logger = require('../utils/logger');

// In route handlers
logger.info('Processing user request', { userId: '123' });
logger.error('Failed to save data', { error: err.message });
logger.debug('Debug info', { data: {...} }); // Only in dev
```

---

## Frontend Development

### Project Structure

```
frontend/src/
├── index.js            # Entry point
├── App.js              # Root component
├── components/         # Reusable components
│   ├── Chatbot.js
│   └── PatientSelector.js
├── services/           # API services
│   └── api.js
├── hooks/              # Custom hooks
│   └── useApi.js
├── utils/              # Utilities
│   └── validation.js
├── context/            # Context providers (future)
└── pages/              # Page components (future)
```

### Creating a New Component

```javascript
import React, { useState } from 'react';
import './ComponentName.css';

/**
 * ComponentName - Description
 * @param {Object} props - Component props
 * @param {string} props.title - Component title
 */
function ComponentName({ title }) {
  const [state, setState] = useState(null);

  return (
    <div className="component-name">
      <h1>{title}</h1>
      {/* JSX */}
    </div>
  );
}

export default ComponentName;
```

### Using the useApi Hook

```javascript
import { useApi } from '../hooks/useApi';
import { queryService } from '../services/api';

function MyComponent() {
  const { execute, loading, error, data } = useApi(
    queryService.getAll
  );

  const handleFetch = async () => {
    try {
      await execute();
    } catch (err) {
      console.error('Failed to fetch:', err);
    }
  };

  return (
    <div>
      <button onClick={handleFetch} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch Data'}
      </button>
      {error && <p className="error">{error}</p>}
      {data && <p className="success">{data.message}</p>}
    </div>
  );
}
```

### CSS Best Practices

```css
/* Use BEM naming convention */
.component-name { }
.component-name__title { }
.component-name__content { }
.component-name--active { }

/* Use CSS variables */
:root {
  --primary-color: #667eea;
  --error-color: #d32f2f;
  --spacing-unit: 8px;
}

.component {
  color: var(--primary-color);
  padding: calc(var(--spacing-unit) * 2);
}

/* Mobile first approach */
.component {
  padding: 10px;
}

@media (min-width: 768px) {
  .component {
    padding: 20px;
  }
}
```

---

## Git Workflow

### Branch Naming

```bash
# Feature branch
git checkout -b feature/user-authentication

# Bug fix branch
git checkout -b bugfix/query-validation

# Hotfix branch
git checkout -b hotfix/critical-error

# Documentation
git checkout -b docs/api-documentation
```

### Commit Messages

```bash
# Good commit message
git commit -m "feat: add user authentication

- Implement JWT-based auth
- Add login endpoint
- Add auth middleware"

# Format: <type>: <subject>
# Types: feat, fix, docs, style, refactor, test, chore
```

### Pull Request Process

1. Create feature branch
2. Make changes and commit
3. Write/update tests
4. Update documentation
5. Create Pull Request with description
6. Address code review comments
7. Merge when approved

---

## Testing

### Manual Testing Checklist

- [ ] Backend health: `curl http://localhost:5000/api/health`
- [ ] Frontend loads: http://localhost:3000
- [ ] Patient selector works
- [ ] Query buttons send requests
- [ ] Error messages display correctly
- [ ] Validation works on invalid input
- [ ] Performance is acceptable (< 3s)

### Testing Sample Queries

```bash
# Test 1: Medications
curl -X POST http://localhost:5000/api/query \
  -H "Content-Type: application/json" \
  -d '{"query":"What medications am I currently taking?","patientId":"patient_001"}'

# Test 2: Appointments
curl -X POST http://localhost:5000/api/query \
  -H "Content-Type: application/json" \
  -d '{"query":"When is my next appointment scheduled?","patientId":"patient_001"}'

# Test 3: Invalid patient
curl -X POST http://localhost:5000/api/query \
  -H "Content-Type: application/json" \
  -d '{"query":"Test query","patientId":"invalid_id"}'
```

---

## Debugging

### Backend Debugging

```javascript
// Use logger
const logger = require('./src/utils/logger');
logger.debug('Debug message', { data });

// Use console (development)
console.log('Value:', value);
console.error('Error:', error);

// Node debugger
node inspect src/index.js
```

### Frontend Debugging

```javascript
// React DevTools browser extension
// Redux DevTools (when Redux added)
// Browser console (F12)

// Add debug logs
console.log('State:', state);
console.error('Error:', error);

// Conditional rendering for testing
{process.env.REACT_APP_DEBUG && <DebugComponent />}

// Use React Strict Mode to catch issues
<React.StrictMode>
  <App />
</React.StrictMode>
```

### Browser DevTools

- **Elements**: Inspect HTML/CSS
- **Console**: Check errors and logs
- **Network**: Monitor API requests
- **Performance**: Check load times
- **Application**: Check local storage

---

## Performance

### Backend Optimization

```javascript
// ✅ Use async/await properly
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// ✅ Cache frequently accessed data
const queryCache = new Map();

// ✅ Limit request size
app.use(bodyParser.json({ limit: '10kb' }));

// ✗ Avoid synchronous operations
// ✗ Avoid deeply nested callbacks
// ✗ Avoid loading unnecessary data
```

### Frontend Optimization

```javascript
// ✅ Use React.memo for expensive components
const ExpensiveComponent = React.memo(ConversationItem);

// ✅ Use useCallback for event handlers
const handleClick = useCallback(() => {
  // Handler
}, [dependencies]);

// ✅ Lazy load components
const ChatComponent = React.lazy(() => import('./Chat'));

// ✗ Avoid unnecessary re-renders
// ✗ Avoid large bundle sizes
// ✗ Avoid memory leaks in useEffect
```

---

## Common Tasks

### Add a New Sample Query

1. **Update backend data**:
```javascript
// backend/src/data/queries.js
{
  query: "New question?",
  patientId: "patient_001",
  response: "Answer text here..."
}
```

2. **Test with curl**:
```bash
curl -X POST http://localhost:5000/api/query \
  -H "Content-Type: application/json" \
  -d '{"query":"New question?","patientId":"patient_001"}'
```

3. **Frontend automatically picks it up** from `/api/queries`

### Add a New Patient

1. **Update backend data**:
```javascript
// backend/src/data/patients.js
'patient_003': {
  name: 'New Patient',
  age: 50,
  medications: [...],
  // ... other fields
}
```

2. **Try accessing**: http://localhost:3000 and select patient

### Change Environment Variables

1. **Edit .env files**:
   - Backend: `backend/.env`
   - Frontend: `frontend/.env.local`

2. **Restart servers** for changes to take effect

### Add a New Dependency

```bash
# Backend
cd backend
npm install package-name
npm install --save-dev dev-package

# Frontend
cd frontend
npm install package-name
npm install --save-dev dev-package

# Commit package-lock.json
git add package-lock.json
git commit -m "chore: update dependencies"
```

### Update Documentation

1. Edit relevant .md file
2. Ensure clarity and accuracy
3. Add examples if helpful
4. Commit changes

---

## Useful Commands

### Backend

```bash
# Start development server (auto-reload)
npm run dev

# Start production server
npm start

# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix
```

### Frontend

```bash
# Start development server (hot reload)
npm start

# Build for production
npm run build

# Run tests (if added)
npm test

# Eject configuration (⚠️ irreversible)
npm run eject
```

### Git

```bash
# Clone repository
git clone <url>

# Create and switch to branch
git checkout -b feature/name

# View status
git status

# Add and commit
git add .
git commit -m "Message"

# Push to remote
git push origin feature/name

# Create pull request (GitHub)
# View commits
git log --oneline
```

---

## Resources

- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [JavaScript ES6+ Guide](https://es6.io/)
- [REST API Design Guidelines](https://restfulapi.net/)

---

## Getting Help

1. **Check existing documentation** - Most answers are there
2. **Review error messages** - They usually indicate the problem
3. **Check browser console** - Frontend errors appear there
4. **Check server logs** - Backend errors logged with timestamps
5. **Search similar issues** - Maybe someone faced it before
6. **Ask team members** - Collaborate and learn together

---

**Happy Coding! 🚀**

Remember: Clean code is maintainable code. Write for your future self!
