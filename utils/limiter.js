const rateLimiter = require('express-rate-limit');

const authLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: 'Слишком много запросов, пожалуйста, попробуйте позже.',
});

module.exports = authLimiter;
