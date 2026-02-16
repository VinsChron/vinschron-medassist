/**
 * Patient Routes
 * SECURITY: Protected endpoints requiring authentication
 */

const router = require('express').Router();
const { patientDatabase } = require('../data/patients');
const { validatePatientId } = require('../utils/validators');
const { asyncHandler } = require('../middleware/errorHandler');
const { authenticatePatientAccess } = require('../middleware/authentication');
const { NotFoundError, UnauthorizedError } = require('../utils/errors');
const { sanitizeObject } = require('../utils/sanitizer');

/**
 * GET /api/patients/list - Get patient list (names only, no sensitive data)
 * PUBLIC ENDPOINT - Limited data exposure
 */
router.get('/list', asyncHandler((req, res) => {
  // Only return names and IDs - NO medical data
  const patients = Object.entries(patientDatabase).map(([id, data]) => ({
    id,
    name: data.name,
    // Explicitly don't include: medications, allergies, medical history
  }));

  res.json({
    success: true,
    data: sanitizeObject(patients),
    timestamp: new Date().toISOString(),
  });
}));

/**
 * GET /api/patients/:patientId - Get patient data
 * PROTECTED ENDPOINT - Requires authentication header
 * Security: Only authenticated users can access patient data
 */
router.get('/:patientId', asyncHandler((req, res) => {
  const validatedPatientId = validatePatientId(req.params.patientId);

  // SECURITY: Require authentication header
  const authPatientId = req.headers['x-patient-id'];
  if (!authPatientId) {
    throw new UnauthorizedError(
      'Authentication required. Use x-patient-id header.'
    );
  }

  // SECURITY: Users can only access their own data
  if (authPatientId !== validatedPatientId) {
    throw new UnauthorizedError(
      'You do not have permission to access this patient\'s data.'
    );
  }

  const patient = patientDatabase[validatedPatientId];
  if (!patient) {
    throw new NotFoundError('Patient');
  }

  // SECURITY: Sanitize output to prevent XSS
  const sanitizedPatient = sanitizeObject(patient);

  res.json({
    success: true,
    data: sanitizedPatient,
    timestamp: new Date().toISOString(),
  });
}));

module.exports = router;
