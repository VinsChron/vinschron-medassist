# 📁 Project Structure - MedAssist AI

Complete and organized folder structure with explanation of each directory and file.

## Root Level

```
MedAssist-AI/
├── backend/                    # Node.js/Express backend server
├── frontend/                   # React.js frontend application
├── README.md                   # Main project documentation
├── GETTING_STARTED.md          # Quick start guide
├── INSTALLATION.md             # Detailed installation guide
├── ARCHITECTURE.md             # Technical architecture
├── DEMO_QUERIES.md             # Sample query documentation
├── PROJECT_STRUCTURE.md        # This file
└── .gitignore                  # Git ignore rules
```

## Backend Structure

```
backend/
├── src/                        # Source code (refactored)
│   ├── index.js               # Main server entry point
│   ├── config/
│   │   └── index.js           # Configuration management
│   ├── middleware/
│   │   ├── errorHandler.js    # Global error handling
│   │   └── requestLogger.js   # Request logging
│   ├── routes/
│   │   ├── health.js          # Health check endpoint
│   │   ├── queries.js         # Query processing routes
│   │   └── patients.js        # Patient data routes
│   ├── utils/
│   │   ├── errors.js          # Custom error classes
│   │   ├── validators.js      # Input validation functions
│   │   └── logger.js          # Logging utility
│   └── data/
│       ├── patients.js        # Patient mock database
│       └── queries.js         # Medical queries data
├── server.js                   # Legacy server file (deprecated)
├── .env                        # Environment variables (local)
├── .env.example                # Environment template
├── package.json               # Dependencies
├── package-lock.json          # Dependency lock file
├── node_modules/              # Installed packages
└── README.md                  # Backend documentation
```

### Backend File Purposes

| File | Purpose |
|------|---------|
| `src/index.js` | Main server initialization and middleware setup |
| `src/config/index.js` | Centralized configuration management |
| `src/middleware/errorHandler.js` | Global error handling & async wrapper |
| `src/middleware/requestLogger.js` | Request/response logging |
| `src/routes/health.js` | Server health check endpoint |
| `src/routes/queries.js` | Medical query processing |
| `src/routes/patients.js` | Patient data retrieval |
| `src/utils/errors.js` | Custom error classes for consistency |
| `src/utils/validators.js` | Input validation & sanitization |
| `src/utils/logger.js` | Logging service |
| `src/data/patients.js` | Patient mock database |
| `src/data/queries.js` | Medical queries database |

## Frontend Structure

```
frontend/
├── src/
│   ├── index.js               # React entry point
│   ├── index.css              # Global styles
│   ├── App.js                 # Main app component
│   ├── App.css                # App styles
│   ├── components/
│   │   ├── Chatbot.js        # Chat interface component
│   │   ├── Chatbot.css       # Chat styling
│   │   ├── PatientSelector.js # Patient selection component
│   │   └── PatientSelector.css # Selector styling
│   ├── services/
│   │   └── api.js            # API communication service
│   ├── hooks/
│   │   └── useApi.js         # Custom hook for API calls
│   ├── context/              # React context (future use)
│   ├── utils/
│   │   └── validation.js     # Frontend validation utilities
│   └── pages/                # Page components (future use)
├── public/
│   ├── index.html            # HTML entry point
│   └── favicon.ico           # Site icon
├── .env.local                # Environment variables (local)
├── .env.example              # Environment template
├── package.json              # Dependencies
├── package-lock.json         # Dependency lock file
├── node_modules/             # Installed packages
└── README.md                 # Frontend documentation
```

### Frontend File Purposes

| File | Purpose |
|------|---------|
| `src/index.js` | React bootstrap and mounting |
| `src/App.js` | Main application component |
| `src/components/Chatbot.js` | Chat interface logic and rendering |
| `src/components/PatientSelector.js` | Patient profile selector |
| `src/services/api.js` | Centralized API communication |
| `src/hooks/useApi.js` | Reusable API hook for components |
| `src/utils/validation.js` | Input validation functions |
| `public/index.html` | HTML template |

## Environment Variables

### Backend (.env)
```
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
LOG_LEVEL=info
```

**Further Configuration** (when needed):
- Database credentials
- API keys (OpenAI, SendGrid)
- Security tokens (JWT, sessions)

### Frontend (.env.local)
```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_API_TIMEOUT=10000
REACT_APP_DEBUG=false
REACT_APP_LOG_LEVEL=info
```

## Data Flow

```
User Input (Frontend)
    ↓
Chatbot Component
    ↓
Validation (frontend/utils/validation.js)
    ↓
API Service (frontend/services/api.js)
    ↓
Axios HTTP Request
    ↓
Backend Server (src/index.js)
    ↓
Request Logger Middleware
    ↓
Route Handler (src/routes/)
    ↓
Validation (src/utils/validators.js)
    ↓
Data Access (src/data/)
    ↓
Database/Mock Data
    ↓
Error Handler (if needed)
    ↓
JSON Response
    ↓
API Service Handler
    ↓
Chatbot Component
    ↓
UI Update (React)
```

## Key Design Patterns

### Backend

1. **Modular Routes**
   - Each feature in separate route file
   - Clean separation of concerns
   - Easy to extend

2. **Centralized Error Handling**
   - Custom error classes
   - Global error handler middleware
   - Consistent error responses

3. **Input Validation**
   - Validation layer before business logic
   - Consistent validation rules
   - Security-focused (XSS, SQL injection prevention)

4. **Configuration Management**
   - Centralized config object
   - Environment-based settings
   - Easy to switch between dev/prod

5. **Logging**
   - Request/response logging
   - Error logging
   - Timestamp tracking

### Frontend

1. **Service Layer**
   - Axios instance with interceptors
   - Centralized API communication
   - Error handling at service level

2. **Custom Hooks**
   - Reusable API logic
   - Loading and error state management
   - Reduces component complexity

3. **Component Organization**
   - Functional components
   - Clear component hierarchy
   - Props-based communication

4. **Validation Utilities**
   - Input validation helpers
   - Real-time feedback
   - Security checks

## Adding New Features

### Adding a New Backend Route

1. Create new file in `src/routes/`
2. Implement route handlers
3. Import in `src/index.js`
4. Register with app: `app.use('/api/route', routeModule)`

### Adding a New Frontend Component

1. Create component in `src/components/`
2. Create corresponding CSS file
3. Use API service for data
4. Use useApi hook for loading/error states

### Adding Database Integration

1. Create `src/models/` directory
2. Create model files for each entity
3. Update data layer files
4. Update routes to use models

## Scalability Considerations

### Current (In-Memory)
- Single server instance
- No persistent storage
- All data in RAM
- Good for demo/testing

### Next Steps (Database)
1. Replace mock data with MongoDB
2. Add connection pooling
3. Implement caching layer
4. Add database migrations

### Production Scaling
1. Horizontal scaling with load balancer
2. Database replication
3. Redis caching
4. CDN for static files
5. API rate limiting
6. Monitoring and alerting

## Dependencies

### Backend
- **express**: Web framework
- **cors**: Cross-origin resource sharing
- **body-parser**: Request body parsing
- **dotenv**: Environment variables

### Frontend
- **react**: UI library
- **react-dom**: React DOM rendering
- **axios**: HTTP client
- **react-scripts**: Build tools

## Best Practices Implemented

✅ **Code Organization**
- Clear folder structure
- Separation of concerns
- Modular design

✅ **Error Handling**
- Custom error classes
- Global error handler
- Validation layer

✅ **Security**
- Input validation
- XSS prevention
- SQL injection prevention
- CORS enabled

✅ **Logging**
- Request logging
- Error logging
- Development/Production modes

✅ **Configuration**
- Environment variables
- Config management
- Easy environment switching

✅ **API Design**
- RESTful structure
- Consistent response format
- Proper HTTP status codes

## Future Improvements

- [ ] Unit tests
- [ ] Integration tests
- [ ] API documentation (Swagger)
- [ ] Database integration
- [ ] Authentication/Authorization
- [ ] Rate limiting
- [ ] Caching layer
- [ ] Monitoring & alerting
- [ ] CI/CD pipeline
- [ ] Docker containerization
- [ ] Kubernetes deployment
- [ ] GraphQL alternative

---

**Professional Project Structure - Ready for Growth** 🚀
