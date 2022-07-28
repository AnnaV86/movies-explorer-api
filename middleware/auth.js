const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const UnauthorizedError = require('../errors/unauthorizedError');
const { MESSAGE_ERROR_UNAUTHORIZED } = require('../constants/index');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(MESSAGE_ERROR_UNAUTHORIZED);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    throw new UnauthorizedError(MESSAGE_ERROR_UNAUTHORIZED);
  }

  req.user = payload;

  next();
};
