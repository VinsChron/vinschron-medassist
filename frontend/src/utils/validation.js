/**
 * Input Validation Utilities for MedAssist AI Frontend
 * SECURITY: Validates user input on the client side
 */

// Validation constraints - IMPROVED for medical queries
export const VALIDATION_RULES = {
  query: {
    minLength: 3,
    maxLength: 500,
    // Allow letters, numbers, common punctuation, hyphens, apostrophes
    // This allows legitimate medical terms like "Type-2 diabetes", "patient's records", etc.
    pattern: /^[a-zA-Z0-9\s\?\-\'\.,:;()[\]&%\-/]*$/,
  },
};

/**
 * Validate a patient query
 * SECURITY: Checks for injection patterns and validates length
 * @param {string} query - The query to validate
 * @returns {Object} - { isValid: boolean, error: string | null }
 */
export const validateQuery = (query) => {
  // Check if query exists and is a string
  if (!query || typeof query !== 'string') {
    return {
      isValid: false,
      error: 'Query must be a valid text string',
    };
  }

  const trimmedQuery = query.trim();

  // Check minimum length
  if (trimmedQuery.length < VALIDATION_RULES.query.minLength) {
    return {
      isValid: false,
      error: `Query must be at least ${VALIDATION_RULES.query.minLength} characters long`,
    };
  }

  // Check maximum length
  if (trimmedQuery.length > VALIDATION_RULES.query.maxLength) {
    return {
      isValid: false,
      error: `Query cannot exceed ${VALIDATION_RULES.query.maxLength} characters`,
    };
  }

  // SECURITY: Check for XSS patterns - block script tags and event handlers
  const xssPatterns = [
    /<script/i,
    /javascript:/i,
    /onerror=/i,
    /onclick=/i,
    /on\w+\s*=/i,
    /<iframe/i,
    /eval\s*\(/i,
  ];

  for (const pattern of xssPatterns) {
    if (pattern.test(trimmedQuery)) {
      return {
        isValid: false,
        error: 'Query contains potentially harmful content',
      };
    }
  }

  // SECURITY: Check for SQL injection patterns
  const sqlPatterns = [
    /(\$where|mapReduce|function\s*\()/i, // MongoDB
    /;[\s]*(drop|delete|insert|update)/i, // SQL
    /(union|select|exec|execute)/i, // SQL
  ];

  for (const pattern of sqlPatterns) {
    if (pattern.test(trimmedQuery)) {
      return {
        isValid: false,
        error: 'Query contains invalid SQL-like characters',
      };
    }
  }

  return {
    isValid: true,
    error: null,
  };
};

/**
 * Sanitize user input
 * SECURITY: Removes dangerous content
 * @param {string} input - The input to sanitize
 * @returns {string} - Sanitized input
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';

  return input
    .trim()
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .substring(0, VALIDATION_RULES.query.maxLength); // Enforce max length
};

/**
 * Validate and return feedback for real-time validation
 * SECURITY: Provides helpful feedback during user input
 * @param {string} query - The query being typed
 * @returns {Object} - { isValid: boolean, warning: string | null }
 */
export const getValidationFeedback = (query) => {
  if (!query) {
    return {
      isValid: false,
      warning: null,
    };
  }

  const trimmed = query.trim();

  if (trimmed.length < VALIDATION_RULES.query.minLength) {
    return {
      isValid: false,
      warning: `${VALIDATION_RULES.query.minLength - trimmed.length} more character${VALIDATION_RULES.query.minLength - trimmed.length !== 1 ? 's' : ''} needed`,
    };
  }

  if (trimmed.length >= VALIDATION_RULES.query.maxLength - 50) {
    return {
      isValid: true,
      warning: `${VALIDATION_RULES.query.maxLength - trimmed.length} characters remaining`,
    };
  }

  return {
    isValid: true,
    warning: null,
  };
};
