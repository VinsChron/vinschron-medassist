# 🏥 MedAssist AI - Backend Server

Express.js server providing REST API endpoints for the MedAssist AI healthcare application.

## 📋 Features

- RESTful API for patient queries
- Mock patient database with medical records
- 5 sample medical queries with AI-generated responses
- CORS support for frontend communication
- Error handling and validation
- Instant response retrieval

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Running the Server

**Development Mode** (with auto-reload):
```bash
npm start
```

Server will start on: `http://localhost:5000`

## 📝 Environment Variables

See `.env` file:
```
PORT=5000
NODE_ENV=development
```

## 🔌 API Endpoints

### 1. Health Check
```http
GET /api/health
```
**Response**:
```json
{
  "status": "Backend is running successfully"
}
```

### 2. Get All Sample Queries
```http
GET /api/queries
```
**Response**:
```json
{
  "success": true,
  "data": [
    { "query": "What medications am I currently taking?" },
    { "query": "When is my next appointment scheduled?" },
    { "query": "What should I know about my allergies?" },
    { "query": "What are my recent lab results?" },
    { "query": "What health tips do you recommend for someone with my conditions?" }
  ]
}
```

### 3. Process Patient Query
```http
POST /api/query
Content-Type: application/json

{
  "query": "What medications am I currently taking?",
  "patientId": "patient_001"
}
```

**Response** (Exact Match):
```json
{
  "success": true,
  "response": "Based on your medical records, you are currently taking the following medications:\n\n1. **Lisinopril 10mg** - Taken once daily for blood pressure management\n2. **Metformin 500mg** - Taken twice daily to help control blood sugar levels\n3. **Aspirin 81mg** - Taken once daily as a preventive measure for heart health\n\nPlease continue taking these medications as prescribed and consult with your doctor before making any changes.",
  "timestamp": "2024-02-11T10:30:00Z"
}
```

**Response** (Generic Response):
```json
{
  "success": true,
  "response": "I understand your question. Unfortunately, I don't have specific information about this in your medical records. Please contact your healthcare provider for detailed assistance with: ...",
  "isGeneric": true,
  "timestamp": "2024-02-11T10:30:00Z"
}
```

### 4. Get Patient Information
```http
GET /api/patient/:patientId
```
**Example**: `/api/patient/patient_001`

**Response**:
```json
{
  "success": true,
  "data": {
    "name": "John Doe",
    "age": 45,
    "medications": ["Lisinopril 10mg", "Metformin 500mg", "Aspirin 81mg"],
    "medicalHistory": ["Hypertension", "Type 2 Diabetes"],
    "lastCheckup": "2024-01-15",
    "bloodPressure": "138/85",
    "bloodSugar": "145 mg/dL",
    "allergies": ["Penicillin"]
  }
}
```

### 5. Get Patient List
```http
GET /api/patients/list
```

**Response**:
```json
{
  "success": true,
  "data": [
    { "id": "patient_001", "name": "John Doe" },
    { "id": "patient_002", "name": "Sarah Johnson" }
  ]
}
```

## 📊 Sample Patient Database

### Patient 1: John Doe (patient_001)
- **Age**: 45
- **Medications**: Lisinopril 10mg, Metformin 500mg, Aspirin 81mg
- **Medical History**: Hypertension, Type 2 Diabetes
- **Last Checkup**: January 15, 2024
- **Blood Pressure**: 138/85 mmHg
- **Blood Sugar**: 145 mg/dL
- **Allergies**: Penicillin

### Patient 2: Sarah Johnson (patient_002)
- **Age**: 38
- **Medications**: Levothyroxine 75mcg, Vitamin D 2000IU
- **Medical History**: Hypothyroidism
- **Last Checkup**: February 1, 2024
- **TSH**: 2.5 mIU/L
- **Allergies**: Sulfonamides

## 🏥 The 5 Sample Medical Queries

1. **What medications am I currently taking?**
   - Returns personalized medication list with dosages
   - Includes usage instructions
   - Patient: John Doe (patient_001)

2. **When is my next appointment scheduled?**
   - Provides appointment date, time, and doctor name
   - Includes preparation instructions
   - Patient: John Doe (patient_001)

3. **What should I know about my allergies?**
   - Lists allergens
   - Explains medical implications
   - Provides safety recommendations
   - Patient: John Doe (patient_001)

4. **What are my recent lab results?**
   - Shows recent health metrics
   - Provides interpretation and recommendations
   - Suggests follow-up timeline
   - Patient: John Doe (patient_001)

5. **What health tips do you recommend for someone with my conditions?**
   - Personalized recommendations based on medical history
   - Covers diet, exercise, monitoring, and general wellness
   - Patient: John Doe (patient_001)

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js v4.18.2
- **Middleware**:
  - cors - Cross-Origin Resource Sharing
  - body-parser - JSON / form data parsing
- **Environment**: dotenv - Load environment variables

## 📦 Dependencies

```json
{
  "express": "^4.18.2",
  "cors": "^2.8.5",
  "dotenv": "^16.0.3",
  "axios": "^1.3.4",
  "body-parser": "^1.20.2"
}
```

## 🧪 Testing the API

### Using cURL

```bash
# Health check
curl http://localhost:5000/api/health

# Get all queries
curl http://localhost:5000/api/queries

# Send a query
curl -X POST http://localhost:5000/api/query \
  -H "Content-Type: application/json" \
  -d '{"query":"What medications am I currently taking?","patientId":"patient_001"}'

# Get patient data
curl http://localhost:5000/api/patient/patient_001
```

### Using REST Client (VS Code)

Create a `requests.http` file in the backend folder and use REST Client extension.

## 🔄 Query Matching Logic

- Matches queries case-insensitively
- Requires exact query text match from sample set
- Validates patient ID matches query's associated patient
- Returns generic response for unmatched queries

## ⚙️ Server Configuration

- **Port**: 5000 (configurable via PORT env variable)
- **CORS**: Enabled for frontend communication
- **Request Size**: Default limits apply
- **Response Format**: JSON
- **Error Handling**: Try-catch with error messages

## 🔐 Security Considerations

Production deployment requires:
- Authentication/Authorization middleware
- Input sanitization
- Rate limiting
- HTTPS/TLS
- Environment variable encryption
- Database encryption
- Patient data HIPAA compliance
- Audit logging

## 📈 Future Enhancements

- Real database integration (MongoDB)
- OpenAI GPT-4 integration for dynamic responses
- Appointment booking system
- Real EHR system integration
- Authentication & authorization
- API rate limiting
- Advanced error handling
- Request logging & monitoring
- Pagination for large datasets
- Webhook support for notifications

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Windows - Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:5000 | xargs kill -9
```

### Module Not Found
```bash
npm install
```

### CORS Errors
- Ensure frontend proxy is set correctly in `frontend/package.json`
- Check CORS middleware is enabled in server.js

## 📞 Support

Check server console for logs and error messages when requests fail.

---

**Backend Ready to Power Your Healthcare AI** 🚀
