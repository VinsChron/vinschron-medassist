# 🏗️ System Architecture - MedAssist AI

Complete technical overview of the MedAssist AI system architecture, components, and data flow.

## 📐 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         WEB BROWSER                             │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │                    REACT FRONTEND                           │ │
│ │  ┌──────────────────────────────────────────────────────┐  │ │
│ │  │  App.js (Main Container)                            │  │ │
│ │  └──────────────────────────────────────────────────────┘  │ │
│ │  ┌──────────────────────────────────────────────────────┐  │ │
│ │  │  Chatbot.js (Chat Interface & Logic)                │  │ │
│ │  │  ├─ Message Display                                 │  │ │
│ │  │  ├─ Sample Query Buttons                            │  │ │
│ │  │  └─ Input Form                                      │  │ │
│ │  └──────────────────────────────────────────────────────┘  │ │
│ │  ┌──────────────────────────────────────────────────────┐  │ │
│ │  │  PatientSelector.js (Profile Selector)              │  │ │
│ │  └──────────────────────────────────────────────────────┘  │ │
│ │  Components communicate via axios HTTP requests to        │ │
│ │  backend (proxied to http://localhost:5000)               │ │
│ └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                            ↕ JSON over HTTP
            (CORS enabled, proxy configured)
┌─────────────────────────────────────────────────────────────────┐
│                    NODE.JS BACKEND                              │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │  server.js (Express.js Application)                         │ │
│ │  ┌────────────────────────────────────────────────────────┐ │ │
│ │  │  Middleware Stack                                      │ │ │
│ │  │  ├─ CORS                                              │ │ │
│ │  │  ├─ Body Parser (JSON)                               │ │ │
│ │  │  └─ Error Handling                                   │ │ │
│ │  └────────────────────────────────────────────────────────┘ │ │
│ │  ┌────────────────────────────────────────────────────────┐ │ │
│ │  │  Route Handlers                                        │ │ │
│ │  │  ├─ GET  /api/health                                 │ │ │
│ │  │  ├─ GET  /api/queries                                │ │ │
│ │  │  ├─ POST /api/query                                  │ │ │
│ │  │  ├─ GET  /api/patient/:patientId                     │ │ │
│ │  │  └─ GET  /api/patients/list                          │ │ │
│ │  └────────────────────────────────────────────────────────┘ │ │
│ │  ┌────────────────────────────────────────────────────────┐ │ │
│ │  │  In-Memory Data                                        │ │ │
│ │  │  ├─ patientDatabase {...}  (Mock patient records)    │ │ │
│ │  │  └─ medicalQueries [...]   (5 sample Q&A pairs)      │ │ │
│ │  └────────────────────────────────────────────────────────┘ │ │
│ └─────────────────────────────────────────────────────────────┘ │
│  Port: 5000                                                      │
└─────────────────────────────────────────────────────────────────┘
```

## 🔄 Data Flow Diagram

### 1. Application Startup

```
User opens http://localhost:3000
         ↓
React App (App.js) renders
         ↓
Health check: GET /api/health
         ↓
Fetch patients: GET /api/patients/list
         ↓
Fetch sample queries: GET /api/queries
         ↓
PatientSelector rendered with options
         ↓
Chatbot rendered with sample query buttons
         ↓
UI Ready for user interaction
```

### 2. Query Processing

```
User clicks sample query or types question
         ↓
Chatbot component captures input
         ↓
Message added to local state (user message)
         ↓
POST /api/query with:
  {
    "query": "What medications am I currently taking?",
    "patientId": "patient_001"
  }
         ↓
Backend processes request
         ↓
Search medicalQueries for exact match
         ↓
Validate patient ID matches
         ↓
Return response
         ↓
Frontend receives response
         ↓
Bot message added to chat
         ↓
Scroll to latest message
         ↓
Display with timestamp and styling
         ↓
User can ask next question
```

## 📝 The 5 Sample Queries Detailed

### Query 1: Medications

**Request:**
```json
{
  "query": "What medications am I currently taking?",
  "patientId": "patient_001"
}
```

**Database Lookup:**
```javascript
patientDatabase['patient_001'].medications
// Returns: ["Lisinopril 10mg", "Metformin 500mg", "Aspirin 81mg"]
```

**Response:**
```
Based on your medical records, you are currently taking the following medications:

1. **Lisinopril 10mg** - Taken once daily for blood pressure management
2. **Metformin 500mg** - Taken twice daily to help control blood sugar levels
3. **Aspirin 81mg** - Taken once daily as a preventive measure for heart health

Please continue taking these medications as prescribed and consult 
with your doctor before making any changes.
```

**Patient Context:**
- Patient: John Doe (patient_001)
- Conditions: Hypertension, Type 2 Diabetes
- Age: 45

---

### Query 2: Appointments

**Request:**
```json
{
  "query": "When is my next appointment scheduled?",
  "patientId": "patient_001"
}
```

**Response:**
```
Your next scheduled appointment is on **March 15, 2024 at 2:00 PM** 
with Dr. Michael Chen for your routine diabetes management checkup. 
Please arrive 15 minutes early and bring your insurance card and 
photo ID. If you need to reschedule, please call our office at least 
48 hours in advance.
```

**Use Case:**
- Helps patients remember appointments
- Reduces appointment no-shows
- Provides preparation instructions

---

### Query 3: Allergies

**Request:**
```json
{
  "query": "What should I know about my allergies?",
  "patientId": "patient_001"
}
```

**Database Lookup:**
```javascript
patientDatabase['patient_001'].allergies
// Returns: ["Penicillin"]
```

**Response:**
```
Based on your medical records, you have a documented allergy to 
**Penicillin**. This is an important allergy to remember, 
particularly because:

- Penicillin is a common antibiotic used to treat bacterial infections
- If you ever need antibiotics, inform your healthcare provider 
  about this allergy
- Alternative antibiotics like Azithromycin or Fluoroquinolones 
  can be used safely
- Make sure all your healthcare providers are aware of this allergy

Wear a medical alert bracelet if possible to inform emergency responders.
```

**Safety Importance:**
- Critical for emergency situations
- Prevents adverse drug interactions
- Guides treatment decisions

---

### Query 4: Lab Results

**Request:**
```json
{
  "query": "What are my recent lab results?",
  "patientId": "patient_001"
}
```

**Database Lookup:**
```javascript
patientDatabase['patient_001'].bloodPressure  // "138/85"
patientDatabase['patient_001'].bloodSugar     // "145 mg/dL"
patientDatabase['patient_001'].lastCheckup    // "2024-01-15"
```

**Response:**
```
Your most recent lab results from your checkup on **January 15, 2024** show:

- **Blood Pressure:** 138/85 mmHg - Slightly elevated, 
  your current medications are helping manage this
- **Blood Sugar:** 145 mg/dL - Within acceptable range for 
  diabetic management
- **Recommendation:** Continue your current medication regimen 
  and maintain a healthy diet and exercise routine

Your next lab work is scheduled for April 2024. Contact your doctor 
if you notice any unusual symptoms.
```

**Clinical Significance:**
- Tracks health metrics over time
- Guides treatment adjustments
- Enables patient self-monitoring

---

### Query 5: Health Recommendations

**Request:**
```json
{
  "query": "What health tips do you recommend for someone with my conditions?",
  "patientId": "patient_001"
}
```

**Database Context:**
```javascript
// Patient has: Hypertension, Type 2 Diabetes
patientDatabase['patient_001'].medicalHistory
// Returns: ["Hypertension", "Type 2 Diabetes"]
```

**Response:**
```
Based on your medical history of Hypertension and Type 2 Diabetes, 
here are personalized health recommendations:

**Diet:**
- Reduce sodium intake to less than 2,300mg per day
- Eat more vegetables, whole grains, and lean proteins
- Limit sugary foods and refined carbohydrates
- Monitor portion sizes

**Exercise:**
- Aim for at least 150 minutes of moderate activity per week
- Include both cardiovascular exercises and strength training
- Start slowly if you're just beginning

**Monitoring:**
- Check your blood sugar regularly as recommended
- Monitor your blood pressure at home
- Keep a log of your readings

**General:**
- Get 7-9 hours of quality sleep each night
- Manage stress through meditation or yoga
- Limit alcohol consumption
- Schedule regular checkups every 3 months

Always consult with your healthcare provider before making 
significant lifestyle changes.
```

**Personalization:**
- Based on patient's specific conditions
- Practical, actionable recommendations
- Emphasizes medical supervision

## 🔍 Query Matching Logic

```
User submits query "What medications am I currently taking?"
         ↓
Convert to lowercase for case-insensitive comparison
         ↓
Search medicalQueries array:
  for (each query in medicalQueries) {
    if (query.query.toLowerCase() === userInput.toLowerCase()) {
      AND query.patientId === selectedPatientId {
        Return query.response
        Return success: true
      }
    }
  }
         ↓
If no exact match found:
  Return generic response with isGeneric: true flag
         ↓
Frontend renders response with appropriate styling
```

### Matching Rules

1. **Case Insensitive**: "what medicines" matches "What Medicines"
2. **Exact Text**: Must match exactly (substrings don't match)
3. **Patient Validation**: Patient ID must match query's associated patient
4. **Generic Fallback**: Unmatched queries return helpful generic response

## 📊 Data Structure

### Patient Database Schema

```javascript
{
  "patient_001": {
    name: string,          // Patient full name
    age: number,          // Patient age
    medications: string[],         // List of medications
    medicalHistory: string[],     // Conditions/diagnoses
    lastCheckup: string,          // Date of last checkup
    bloodPressure: string,        // BP reading
    bloodSugar: string,           // Blood glucose level
    allergies: string[]           // Documented allergies
  }
}
```

### Medical Query Schema

```javascript
{
  query: string,          // The question asked
  patientId: string,      // Associated patient
  response: string        // Pre-generated response
}
```

### API Response Schema

```javascript
{
  success: boolean,       // Request success status
  response: string,       // The AI-generated or matched response
  isGeneric?: boolean,    // Flag if response is generic
  timestamp: string,      // ISO timestamp of response
  error?: string          // Error message if applicable
}
```

## 🌐 Network Communication

### Frontend → Backend Communication

**HTTP Methods Used:**
- `GET`: Retrieve data (queries, patients)
- `POST`: Send data (patient queries)

**Headers:**
```
Content-Type: application/json
CORS: Access-Control-Allow-Origin: *
```

**Request Example:**
```http
POST /api/query HTTP/1.1
Host: localhost:5000
Content-Type: application/json
Content-Length: 95

{
  "query": "What medications am I currently taking?",
  "patientId": "patient_001"
}
```

**Response Example:**
```http
HTTP/1.1 200 OK
Content-Type: application/json
Access-Control-Allow-Origin: *

{
  "success": true,
  "response": "Based on your medical records...",
  "timestamp": "2024-02-11T10:30:00.000Z"
}
```

## 🔌 Component Interaction

### App.js ↔ Chatbot.js

```javascript
// Father-to-Child: Props
<Chatbot patientId="patient_001" />

// Child-to-Father: Callback (if needed)
// Currently: Chatbot is self-contained
```

### App.js ↔ PatientSelector.js

```javascript
// Father-to-Child: Props
<PatientSelector
  patients={patients}
  selectedPatient={selectedPatient}
  onSelectPatient={setSelectedPatient}
/>

// Child-to-Father: Callback
onSelectPatient(newPatientId)  // Updates selectedPatient state
```

### State Management Flow

```
App Component State
├── selectedPatient (controlled by PatientSelector)
├── patients (fetched from backend)
├── loading (during data fetch)
└── backendConnected (from health check)
         ↓
Passed to child components
         ↓
Chatbot updates its own:
├── messages
├── loading
├── error
└── sampleQueries
```

## 📱 Frontend Component Hierarchy

```
App
├── Header
├── PatientSelector
│   └── Dropdown input
├── Chatbot
│   ├── Chatbot Header
│   ├── Message Container
│   │   └── Message items
│   │       ├── Bot messages
│   │       ├── User messages
│   │       └── Error messages
│   ├── Sample Queries Grid
│   │   └── Query buttons
│   └── Input Area
│       └── Input form
│           ├── Text input
│           └── Send button
└── Footer
```

## 🔐 Data Flow Security

### Current (Development)

- No authentication
- Data in memory (not persisted)
- Plain HTTP (localhost only)
- No encryption

### Production Requirements

```
User Input
    ↓
[Input Validation]
    ↓
[Sanitization]
    ↓
[Encryption]
    ↓
[HTTPS/TLS]
    ↓
Backend
    ↓
[Authentication]
    ↓
[Authorization]
    ↓
[Database]
    ↓
[Encrypted Storage]
```

## ⚡ Performance Characteristics

### Response Times

- Backend Query Matching: < 10ms
- Network Latency: 10-50ms
- Frontend Rendering: < 100ms
- **Total**: < 3 seconds ✅

### Scalability Considerations

**Current**: In-memory data, single process
- Handles: ~ 100 concurrent users
- Storage: All data in RAM

**For Scale**:
- Add real database (MongoDB)
- Use load balancer
- Implement caching (Redis)
- Use AWS Lambda/Serverless
- CDN for static assets

## 🚀 Deployment Architecture

### Development

```
Developer Machine
├── Backend: localhost:5000
└── Frontend: localhost:3000
```

### Production

```
AWS/Cloud Platform
├── Frontend: S3 + CloudFront
├── Backend: EC2/Lambda
└── Database: RDS/Atlas
```

## 📋 API Endpoints Reference

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/health` | Server health check |
| GET | `/api/queries` | Get all sample queries |
| POST | `/api/query` | Process patient query |
| GET | `/api/patient/:id` | Get patient data |
| GET | `/api/patients/list` | Get all patients |

## 🔄 Message Flow Example

```
1. User: "What medications am I currently taking?"
            ↓
2. Frontend: axios.post('/api/query', 
              {query: '...', patientId: 'patient_001'})
            ↓
3. Backend: Searches medicalQueries array
            ↓
4. Backend: Finds exact match in query #1
            ↓
5. Backend: Validates patientId === 'patient_001'
            ↓
6. Backend: Returns matched response + timestamp
            ↓
7. Frontend: Receives response JSON
            ↓
8. Frontend: Creates message object with bot type
            ↓
9. Frontend: Adds to messages state array
            ↓
10. React: Re-renders with new message
            ↓
11. CSS: Animation smoothly shows new message
            ↓
12. Browser: Scrolls to latest message
            ↓
13. User: Sees response with timestamp
```

---

**Architecture designed for clarity, scalability, and user experience** 🏗️✨
