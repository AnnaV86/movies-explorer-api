const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;
const NotFoundError = require('../errors/notFoundError');
const UnauthorizedError = require('../errors/unauthorizedError');
const BadRequestError = require('../errors/badRequestError');
const ConflictError = require('../errors/conflictError');
const { messagesError } = require('../utils/messagesError');
const {
  MESSAGE_INCORRECT_EMAIL_OR_PASSWORD,
  MESSAGE_NOT_FOUND_USER_ID,
  MESSAGE_INCORRECT_DATA,
  MESSAGE_CONFLICT_EMAIL,
  MESSAGE_NOT_FOUND_USER_THIS_ID,
  VALIDATOR_ERROR,
  LOGIN_COMPLETED,
} = require('../constants/index');

// Контроллер login
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({ message: LOGIN_COMPLETED, token });
    })
    .catch(() => next(new UnauthorizedError(MESSAGE_INCORRECT_EMAIL_OR_PASSWORD)));
};

// Получение информации о пользователе GET users/me
module.exports.getProfile = (req, res, next) => User
  .findById(req.user._id)
  .then((user) => {
    if (!user) {
      throw new NotFoundError(MESSAGE_NOT_FOUND_USER_ID);
    }
    res.send(user);
  })
  .catch(next);

// Создание нового пользователя POST
module.exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      email: req.body.email,
      password: hash,
      name: req.body.name,
    }))
    .then((user) => res.send({
      name: user.name, _id: user._id, email: user.email,
    }))
    .catch((error) => {
      if (error.name === VALIDATOR_ERROR) {
        next(new BadRequestError(`${MESSAGE_INCORRECT_DATA} ${messagesError(error)}`));
      } else if (error.code === 11000) {
        next(new ConflictError(MESSAGE_CONFLICT_EMAIL));
      } else next(error);
    });
};

// Обновляет информацию о пользователе PATCH users/me (email и имя)
module.exports.updateProfile = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(MESSAGE_NOT_FOUND_USER_THIS_ID);
      }
      res.send(user);
    })
    .catch((error) => {
      if (error.name === VALIDATOR_ERROR) {
        next(new BadRequestError(`${MESSAGE_INCORRECT_DATA} ${messagesError(error)}`));
      } else if (error.code === 11000) {
        next(new ConflictError(MESSAGE_CONFLICT_EMAIL));
      } else next(error);
    });
};
