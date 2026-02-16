/**
 * Logger Utility
 */

const config = require('../config');

const LOG_LEVELS = {
  ERROR: 'ERROR',
  WARN: 'WARN',
  INFO: 'INFO',
  DEBUG: 'DEBUG',
};

class Logger {
  constructor() {
    this.level = config.logLevel;
  }

  formatMessage(level, message, data = null) {
    const timestamp = new Date().toISOString();
    const formatted = `[${timestamp}] [${level}] ${message}`;
    return data ? `${formatted} - ${JSON.stringify(data)}` : formatted;
  }

  error(message, data = null) {
    console.error(this.formatMessage(LOG_LEVELS.ERROR, message, data));
  }

  warn(message, data = null) {
    console.warn(this.formatMessage(LOG_LEVELS.WARN, message, data));
  }

  info(message, data = null) {
    console.info(this.formatMessage(LOG_LEVELS.INFO, message, data));
  }

  debug(message, data = null) {
    if (config.isDev) {
      console.debug(this.formatMessage(LOG_LEVELS.DEBUG, message, data));
    }
  }
}

module.exports = new Logger();
