/**
 * Patient Data Store
 */

const patientDatabase = {
  'patient_001': {
    name: 'John Doe',
    age: 45,
    medications: ['Lisinopril 10mg', 'Metformin 500mg', 'Aspirin 81mg'],
    medicalHistory: ['Hypertension', 'Type 2 Diabetes'],
    lastCheckup: '2024-01-15',
    bloodPressure: '138/85',
    bloodSugar: '145 mg/dL',
    allergies: ['Penicillin']
  },
  'patient_002': {
    name: 'Sarah Johnson',
    age: 38,
    medications: ['Levothyroxine 75mcg', 'Vitamin D 2000IU'],
    medicalHistory: ['Hypothyroidism'],
    lastCheckup: '2024-02-01',
    tsh: '2.5 mIU/L',
    allergies: ['Sulfonamides']
  }
};

module.exports = { patientDatabase };
