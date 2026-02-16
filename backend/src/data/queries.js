/**
 * Medical Queries Data Store
 */

const medicalQueries = [
  {
    query: "What medications am I currently taking?",
    patientId: 'patient_001',
    response: "Based on your medical records, you are currently taking the following medications:\n\n1. **Lisinopril 10mg** - Taken once daily for blood pressure management\n2. **Metformin 500mg** - Taken twice daily to help control blood sugar levels\n3. **Aspirin 81mg** - Taken once daily as a preventive measure for heart health\n\nPlease continue taking these medications as prescribed and consult with your doctor before making any changes."
  },
  {
    query: "When is my next appointment scheduled?",
    patientId: 'patient_001',
    response: "Your next scheduled appointment is on **March 15, 2024 at 2:00 PM** with Dr. Michael Chen for your routine diabetes management checkup. Please arrive 15 minutes early and bring your insurance card and photo ID. If you need to reschedule, please call our office at least 48 hours in advance."
  },
  {
    query: "What should I know about my allergies?",
    patientId: 'patient_001',
    response: "Based on your medical records, you have a documented allergy to **Penicillin**. This is an important allergy to remember, particularly because:\n\n- Penicillin is a common antibiotic used to treat bacterial infections\n- If you ever need antibiotics, inform your healthcare provider about this allergy\n- Alternative antibiotics like Azithromycin or Fluoroquinolones can be used safely\n- Make sure all your healthcare providers are aware of this allergy\n\nWear a medical alert bracelet if possible to inform emergency responders."
  },
  {
    query: "What are my recent lab results?",
    patientId: 'patient_001',
    response: "Your most recent lab results from your checkup on **January 15, 2024** show:\n\n- **Blood Pressure:** 138/85 mmHg - Slightly elevated, your current medications are helping manage this\n- **Blood Sugar:** 145 mg/dL - Within acceptable range for diabetic management\n- **Recommendation:** Continue your current medication regimen and maintain a healthy diet and exercise routine\n\nYour next lab work is scheduled for April 2024. Contact your doctor if you notice any unusual symptoms."
  },
  {
    query: "What health tips do you recommend for someone with my conditions?",
    patientId: 'patient_001',
    response: "Based on your medical history of Hypertension and Type 2 Diabetes, here are personalized health recommendations:\n\n**Diet:**\n- Reduce sodium intake to less than 2,300mg per day\n- Eat more vegetables, whole grains, and lean proteins\n- Limit sugary foods and refined carbohydrates\n- Monitor portion sizes\n\n**Exercise:**\n- Aim for at least 150 minutes of moderate activity per week\n- Include both cardiovascular exercises and strength training\n- Start slowly if you're just beginning\n\n**Monitoring:**\n- Check your blood sugar regularly as recommended\n- Monitor your blood pressure at home\n- Keep a log of your readings\n\n**General:**\n- Get 7-9 hours of quality sleep each night\n- Manage stress through meditation or yoga\n- Limit alcohol consumption\n- Schedule regular checkups every 3 months\n\nAlways consult with your healthcare provider before making significant lifestyle changes."
  }
];

module.exports = { medicalQueries };
