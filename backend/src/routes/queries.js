/**
 * Query Routes
 * SECURITY: Input validated and output sanitized
 */

const router = require('express').Router();
const { medicalQueries } = require('../data/queries');
const { patientDatabase } = require('../data/patients');
const { validateQuery, validatePatientId } = require('../utils/validators');
const { asyncHandler } = require('../middleware/errorHandler');
const { ValidationError, NotFoundError, UnauthorizedError } = require('../utils/errors');
const { sanitizeString, sanitizeObject } = require('../utils/sanitizer');

/**
 * GET /api/queries - Get all sample queries
 * Returns sanitized query list
 */
router.get('/', asyncHandler((req, res) => {
  // Sanitize all queries before sending
  const queries = medicalQueries.map(q => ({
    query: sanitizeString(q.query),
  }));

  res.json({
    success: true,
    data: sanitizeObject(queries),
    timestamp: new Date().toISOString(),
  });
}));

/**
 * POST /api/query - Process patient query
 * SECURITY: Input validated, authentication optional, output sanitized
 */
router.post('/', asyncHandler((req, res) => {
  const { query, patientId } = req.body;

  // SECURITY: Validate inputs
  const validatedQuery = validateQuery(query);
  const validatedPatientId = validatePatientId(patientId);

  // SECURITY: Check if patient exists
  if (!patientDatabase[validatedPatientId]) {
    throw new NotFoundError('Patient');
  }

  // SECURITY: Optional authentication - if header provided, verify it matches
  const authPatientId = req.headers['x-patient-id'];
  if (authPatientId && authPatientId !== validatedPatientId) {
    throw new UnauthorizedError(
      'You do not have permission to query this patient\'s data.'
    );
  }

  // Find matching query
  const matchedQuery = medicalQueries.find(q =>
    q.query.toLowerCase() === validatedQuery.toLowerCase() &&
    q.patientId === validatedPatientId
  );

  if (matchedQuery) {
    return res.json({
      success: true,
      response: sanitizeString(matchedQuery.response),
      timestamp: new Date().toISOString(),
    });
  }

  // Return generic response for unmatched queries - SANITIZED
  res.json({
    success: true,
    response: sanitizeString(
      `I understand your question. Unfortunately, I don't have specific information about this in your medical records. Please contact your healthcare provider for detailed assistance with: ${validatedQuery}`
    ),
    isGeneric: true,
    timestamp: new Date().toISOString(),
  });
}));

module.exports = router;
