import React from 'react';
import './PatientSelector.css';

function PatientSelector({ patients, selectedPatient, onSelectPatient }) {
  return (
    <div className="patient-selector">
      <label htmlFor="patient-select">Select Patient Profile:</label>
      <select
        id="patient-select"
        value={selectedPatient}
        onChange={(e) => onSelectPatient(e.target.value)}
        className="patient-select"
      >
        {patients.map((patient) => (
          <option key={patient.id} value={patient.id}>
            {patient.name} ({patient.id})
          </option>
        ))}
      </select>
    </div>
  );
}

export default PatientSelector;
