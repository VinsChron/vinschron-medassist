/**
 * Authentication Middleware
 * Provides basic authentication for protecting endpoints
 */

const { UnauthorizedError } = require('../utils/errors');

/**
 * Mock authentication - in production, use JWT or OAuth
 * This prevents unauthorized access to protected endpoints
 */
const authenticatePatientAccess = (req, res, next) => {
  const patientId = req.body.patientId || req.params.patientId;
  const userPatientId = req.headers['x-patient-id'];

  // In production, verify JWT token and match patient ID
  // For now, we check if header is provided
  if (!userPatientId) {
    throw new UnauthorizedError(
      'Patient ID header (x-patient-id) is required. Please provide valid authentication.'
    );
  }

  // Verify user can only access their own patient data
  if (patientId && userPatientId !== patientId) {
    throw new UnauthorizedError(
      'You do not have permission to access this patient\'s data.'
    );
  }

  // Add verified patient ID to request for use in routes
  req.authenticatedPatientId = userPatientId;
  next();
};

module.exports = {
  authenticatePatientAccess,
};
