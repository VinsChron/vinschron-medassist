/**
 * Request Logging Middleware
 * Logs requests securely without exposing sensitive data
 */

const logger = require('../utils/logger');

const requestLogger = (req, res, next) => {
  const startTime = Date.now();

  // Log request - ONLY log method and path, NOT IP or user agent (privacy)
  logger.info(`${req.method} ${req.path}`);

  // Log response when finished - do NOT log user agent or IP
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    // Remove sensitive data from logs
    logger.info(`${req.method} ${req.path} - ${res.statusCode} (${duration}ms)`);
  });

  next();
};

module.exports = requestLogger;
