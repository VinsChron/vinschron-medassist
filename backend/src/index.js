/**
 * MedAssist AI - Main Application Entry Point
 * Refactored with modular architecture
 */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const config = require('./config');
const logger = require('./utils/logger');
const requestLogger = require('./middleware/requestLogger');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');
const securityHeaders = require('./middleware/securityHeaders');
const rateLimitMiddleware = require('./middleware/rateLimit');
const healthRoutes = require('./routes/health');
const queryRoutes = require('./routes/queries');
const patientRoutes = require('./routes/patients');

// Initialize Express app
const app = express();

// Security Middleware - must be first
app.use(securityHeaders);
app.use(rateLimitMiddleware);

// CORS Configuration
app.use(cors({
  origin: config.corsOrigin,
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
}));

// Body Parser with size limits
app.use(bodyParser.json({ limit: '10kb' }));
app.use(bodyParser.urlencoded({ limit: '10kb', extended: true }));

// Request Logging
app.use(requestLogger);

// API Routes
app.use(`${config.apiPrefix}/health`, healthRoutes);
app.use(`${config.apiPrefix}/query`, queryRoutes);
app.use(`${config.apiPrefix}/queries`, queryRoutes);
app.use(`${config.apiPrefix}/patients`, patientRoutes);

// 404 Handler
app.use(notFoundHandler);

// Global Error Handler (must be last)
app.use(errorHandler);

// Start Server
const server = app.listen(config.port, () => {
  logger.info(`🏥 MedAssist AI Backend running on http://localhost:${config.port}`);
  logger.info(`Environment: ${config.nodeEnv}`);
  logger.info(`API Prefix: ${config.apiPrefix}`);
  
  if (config.isDev) {
    logger.info('📝 Development mode - Stack traces enabled');
  }
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Rejection', { error: err.message });
  server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception', { error: err.message });
  process.exit(1);
});

module.exports = app;
