const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
// const cors = require('cors');
const { celebrate, Joi, errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middleware/loggers');
const { login, createUser } = require('./controllers/users');
const auth = require('./middleware/auth');
const userRouter = require('./routes/users');
const movieRouter = require('./routes/movies');
const centralError = require('./middleware/centralError');
const NotFoundError = require('./errors/notFoundError');

// const allowedCors = {
//   origin: [
//     'https://vidmovies.students.nomoredomains.xyz',
//     'http://vidmovies.students.nomoredomains.xyz',
//     'https://praktikum.tk',
//     'http://praktikum.tk',
//     'http://localhost:3000',
//   ],
//   allowedHeaders: ['Content-Type', 'Origin', 'Referer', 'Accept', 'Authorization'],
//   preflightContinue: false,
//   optionsSuccessStatus: 204,
//   credentials: true,
// };

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(requestLogger);
// app.use('*', cors(allowedCors));

// Регистрация
app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
      name: Joi.string().min(2).max(30),
    }),
  }),
  createUser,
);

// Вход: проверка логина
app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  login,
);

app.use(auth);

app.use(userRouter);
app.use(movieRouter);

app.use('*', (req, res, next) => next(new NotFoundError('Запрошен не существующий ресурс')));
app.use(errorLogger);
app.use(errors());

app.use(centralError);
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server start: ${PORT}`);
});
