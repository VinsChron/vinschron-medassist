/**
 * Output Sanitization Utilities
 * Sanitizes data before sending to clients to prevent XSS
 */

/**
 * Escape HTML special characters to prevent XSS
 */
const escapeHtml = (text) => {
  if (typeof text !== 'string') return text;

  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };

  return text.replace(/[&<>"']/g, (char) => map[char]);
};

/**
 * Remove potentially dangerous content from strings
 */
const sanitizeString = (str) => {
  if (typeof str !== 'string') return '';

  return str
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+\s*=\s*['"]/gi, '')
    .replace(/javascript:/gi, '')
    .trim();
};

/**
 * Sanitize an object recursively (safe for JSON response)
 */
const sanitizeObject = (obj) => {
  if (typeof obj === 'string') {
    return escapeHtml(obj);
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => sanitizeObject(item));
  }

  if (obj !== null && typeof obj === 'object') {
    const sanitized = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        sanitized[key] = sanitizeObject(obj[key]);
      }
    }
    return sanitized;
  }

  return obj;
};

/**
 * Remove sensitive fields from user-facing responses
 */
const stripSensitiveFields = (data) => {
  // Remove internal fields that shouldn't be exposed
  const sensitiveFields = ['password', 'hash', 'salt', 'token', 'secret', '__v'];

  if (Array.isArray(data)) {
    return data.map((item) => stripSensitiveFields(item));
  }

  if (data !== null && typeof data === 'object') {
    const sanitized = {};
    for (const key in data) {
      if (
        Object.prototype.hasOwnProperty.call(data, key) &&
        !sensitiveFields.includes(key.toLowerCase())
      ) {
        sanitized[key] = stripSensitiveFields(data[key]);
      }
    }
    return sanitized;
  }

  return data;
};

module.exports = {
  escapeHtml,
  sanitizeString,
  sanitizeObject,
  stripSensitiveFields,
};
