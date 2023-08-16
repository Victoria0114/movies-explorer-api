const jwt = require('jsonwebtoken');

const { NODE_ENV, SECRET_KEY } = process.env;
const { DEV_SECRET_KEY } = require('../utils/config');

const UnauthorizedError = require('../errors/UnauthorizedError');
const { authorizationMessage } = require('../utils/errorMessages');

const extractBearerToken = (header) => header.replace('Bearer ', '');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError(authorizationMessage));
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? SECRET_KEY : DEV_SECRET_KEY);
  } catch (err) {
    next(new UnauthorizedError(authorizationMessage));
  }

  req.user = payload;

  return next();
};

module.exports = auth;
