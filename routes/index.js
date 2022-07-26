const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const auth = require('../middleware/auth');
const { login, createUser } = require('../controllers/users');
const NotFoundError = require('../errors/notFoundError');
const { validationUserData, validationLogin } = require('../middleware/validations');

// Регистрация
router.post(
  '/signup',
  validationUserData,
  createUser,
);

// Вход: проверка логина
router.post(
  '/signin',
  validationLogin,
  login,
);

router.use(auth);

router.use(userRouter);
router.use(movieRouter);

router.use('*', (req, res, next) => next(new NotFoundError('Запрошен не существующий ресурс')));

module.exports = router;
