const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const { celebrate, Joi, errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middleware/loggers');
const auth = require('./middleware/auth');
const userRouter = require('./routes/users');
const movieRouter = require('./routes/movies');
const centralError = require('./middleware/centralError');
const NotFoundError = require('./errors/notFoundError');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(requestLogger);

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
