const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const helmet = require('helmet');
const { errors } = require('celebrate');
const rateLimiter = require('./middleware/rateLimiter');
const { requestLogger, errorLogger } = require('./middleware/loggers');
const router = require('./routes/index');
const centralError = require('./middleware/centralError');

const app = express();
const { NODE_ENV, PORT = 3000, MONGO_DB } = process.env;

mongoose.connect(NODE_ENV === 'production' ? MONGO_DB : 'mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(helmet());
app.use(express.json());
app.use(requestLogger);
app.use(rateLimiter);

app.use('/', router);

app.use(errorLogger);
app.use(errors());

app.use(centralError);
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server start: ${PORT}`);
});
