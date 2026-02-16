/**
 * Environment Configuration
 */

const config = {
  // Server
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // API
  apiVersion: 'v1',
  apiPrefix: '/api',
  
  // CORS
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  
  // Validation
  queryLimits: {
    minLength: 3,
    maxLength: 500,
  },
  
  // Logging
  logLevel: process.env.LOG_LEVEL || 'info',
  
  // Production safety
  isProd: process.env.NODE_ENV === 'production',
  isDev: process.env.NODE_ENV === 'development',
  isTest: process.env.NODE_ENV === 'test',
};

module.exports = config;
