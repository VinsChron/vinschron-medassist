/**
 * Rate Limiting Middleware
 * Prevents brute force attacks and DoS attacks
 */

const rateLimit = {};

// Configuration
const MAX_REQUESTS = 100;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const CLEANUP_INTERVAL = 60 * 1000; // Cleanup every minute

// Cleanup function to remove old entries
setInterval(() => {
  const now = Date.now();
  for (const ip in rateLimit) {
    if (now - rateLimit[ip].firstRequest > WINDOW_MS) {
      delete rateLimit[ip];
    }
  }
}, CLEANUP_INTERVAL);

/**
 * Rate limiting middleware
 */
const rateLimitMiddleware = (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();

  if (!rateLimit[ip]) {
    rateLimit[ip] = {
      count: 1,
      firstRequest: now,
      lastRequest: now,
    };
    return next();
  }

  const record = rateLimit[ip];

  // If window has expired, reset
  if (now - record.firstRequest > WINDOW_MS) {
    rateLimit[ip] = {
      count: 1,
      firstRequest: now,
      lastRequest: now,
    };
    return next();
  }

  // Check if limit exceeded
  if (record.count >= MAX_REQUESTS) {
    const remainingTime = Math.ceil(
      (WINDOW_MS - (now - record.firstRequest)) / 1000
    );

    return res.status(429).json({
      success: false,
      error: 'Too many requests. Please try again later.',
      retryAfter: remainingTime,
      statusCode: 429,
      timestamp: new Date().toISOString(),
    });
  }

  // Increment counter
  record.count += 1;
  record.lastRequest = now;

  next();
};

module.exports = rateLimitMiddleware;
