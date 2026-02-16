import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chatbot from './components/Chatbot';
import PatientSelector from './components/PatientSelector';
import './App.css';

function App() {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [backendConnected, setBackendConnected] = useState(false);

  useEffect(() => {
    // Check if backend is running
    axios.get('/api/health')
      .then(() => {
        setBackendConnected(true);
      })
      .catch(() => {
        setBackendConnected(false);
        console.error('Backend is not running');
      });

    // Fetch available patients
    axios.get('/api/patients/list')
      .then((response) => {
        if (response.data.success) {
          setPatients(response.data.data);
          if (response.data.data.length > 0) {
            setSelectedPatient(response.data.data[0].id);
          }
        }
      })
      .catch((error) => {
        console.error('Error fetching patients:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading MedAssist AI...</p>
      </div>
    );
  }

  if (!backendConnected) {
    return (
      <div className="error-container">
        <h1>⚠️ Backend Connection Error</h1>
        <p>The backend server is not running. Please start it first:</p>
        <code>cd backend && npm install && npm start</code>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="app-container">
        <header className="app-header">
          <h1>🏥 MedAssist AI</h1>
          <p>Your AI-Powered Healthcare Assistant</p>
        </header>

        <div className="app-body">
          {patients.length > 0 && selectedPatient && (
            <>
              <PatientSelector
                patients={patients}
                selectedPatient={selectedPatient}
                onSelectPatient={setSelectedPatient}
              />
              <Chatbot patientId={selectedPatient} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
