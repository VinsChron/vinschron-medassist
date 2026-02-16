/**
 * Request Validation Utilities
 * SECURITY: Validates input to prevent injection attacks
 */

const config = require('../config');
const { ValidationError } = require('./errors');

/**
 * Validate query string
 * SECURITY: Check length, format, and XSS patterns
 */
const validateQuery = (query) => {
  if (!query || typeof query !== 'string') {
    throw new ValidationError('Query must be a valid string');
  }

  const trimmed = query.trim();

  if (trimmed.length < config.queryLimits.minLength) {
    throw new ValidationError(
      `Query must be at least ${config.queryLimits.minLength} characters long`
    );
  }

  if (trimmed.length > config.queryLimits.maxLength) {
    throw new ValidationError(
      `Query cannot exceed ${config.queryLimits.maxLength} characters`
    );
  }

  // SECURITY: Check for XSS patterns - block script tags and event handlers
  const xssPatterns = [
    /<script/i,
    /javascript:/i,
    /onerror=/i,
    /onclick=/i,
    /on\w+\s*=/i, // Block event handlers
    /<iframe/i,
    /eval\s*\(/i,
  ];

  for (const pattern of xssPatterns) {
    if (pattern.test(trimmed)) {
      throw new ValidationError('Query contains invalid content');
    }
  }

  // SECURITY: Check for SQL injection patterns (NoSQL attacks)
  const sqlPatterns = [
    /(\$where|mapReduce|function\s*\()/i, // MongoDB injection
    /;[\s]*drop/i, // SQL injection
    /;[\s]*delete/i,
  ];

  for (const pattern of sqlPatterns) {
    if (pattern.test(trimmed)) {
      throw new ValidationError('Query contains invalid SQL patterns');
    }
  }

  return trimmed;
};

/**
 * Validate patient ID
 * SECURITY: Strict format validation
 */
const validatePatientId = (patientId) => {
  if (!patientId || typeof patientId !== 'string') {
    throw new ValidationError('Patient ID must be a valid string');
  }

  // Strict format validation: patient_XXX where X is digit
  if (!/^patient_\d{3}$/.test(patientId)) {
    throw new ValidationError('Invalid patient ID format');
  }

  return patientId.trim();
};

/**
 * Sanitize input to prevent injection
 * SECURITY: Removes dangerous characters
 */
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';

  return input
    .trim()
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .substring(0, config.queryLimits.maxLength);
};

module.exports = {
  validateQuery,
  validatePatientId,
  sanitizeInput,
};
