/**
 * Error Handling Middleware
 */

const logger = require('../utils/logger');
const config = require('../config');
const { AppError } = require('../utils/errors');
const { sanitizeString } = require('../utils/sanitizer');

/**
 * Async error wrapper for routes
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

/**
 * Global error handler middleware
 */
const errorHandler = (err, req, res, next) => {
  // Set default values
  let error = err;

  // Log error (but don't expose sensitive data in response)
  logger.error('Request Error', {
    message: err.message,
    statusCode: err.statusCode || 500,
    path: req.path,
    method: req.method,
  });

  // Handle custom errors
  if (error instanceof AppError) {
    const sanitizedError = {
      success: false,
      error: sanitizeString(error.message),
      statusCode: error.statusCode,
      timestamp: new Date().toISOString(),
    };
    return res.status(error.statusCode).json(sanitizedError);
  }

  // Handle validation errors
  if (error.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: sanitizeString(error.message),
      statusCode: 400,
      timestamp: new Date().toISOString(),
    });
  }

  // Handle unknown route
  if (error.message === 'Not Found') {
    return res.status(404).json({
      success: false,
      error: 'Route not found',
      statusCode: 404,
      timestamp: new Date().toISOString(),
    });
  }

  // Production error handling (NEVER expose stack trace or internal details)
  if (config.isProd) {
    return res.status(500).json({
      success: false,
      error: 'Internal server error. Please contact support if this persists.',
      statusCode: 500,
      timestamp: new Date().toISOString(),
    });
  }

  // Development error handling (safe for development only)
  return res.status(error.statusCode || 500).json({
    success: false,
    error: sanitizeString(error.message),
    statusCode: error.statusCode || 500,
    timestamp: new Date().toISOString(),
    // Only include stack trace in development and if explicitly enabled
    ...(config.isDev && process.env.SHOW_STACK_TRACE === 'true' && {
      stack: error.stack,
    }),
  });
};

/**
 * 404 Not Found handler
 */
const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    error: `Route ${req.path} not found`,
    statusCode: 404,
    timestamp: new Date().toISOString(),
  });
};

module.exports = {
  asyncHandler,
  errorHandler,
  notFoundHandler,
};
