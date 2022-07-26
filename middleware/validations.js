const { Joi, celebrate } = require('celebrate');

const validationUrl = (url, helpers) => {
  const regex = /^https?:\/\/(www\.)?[a-zA-Z\d-]+\.[\w\d\-.~:/?#[\]@!$&'()*+,;=]{2,}#?$/g;
  if (regex.test(url)) {
    return url;
  }
  return helpers.error('Ошибка url');
};

const validationUserData = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
  }),
});

const validationLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string().required().min(8),
  }),
});

const validationId = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex(),
  }),
});

const validationUpdateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(100),
    email: Joi.string().email(),
  }),
});

const validationMovieData = celebrate({
  body: Joi.object().keys({
    country: Joi.string().min(2).max(100).required(),
    director: Joi.string().min(2).max(100).required(),
    duration: Joi.number().required(),
    year: Joi.string().length(4).required(),
    description: Joi.string().min(2).required(),
    image: Joi.string().custom(validationUrl).required(),
    trailerLink: Joi.string().custom(validationUrl).required(),
    thumbnail: Joi.string().custom(validationUrl).required(),
    movieId: Joi.string().required(),
    nameRU: Joi.string().min(2).max(100).required(),
    nameEN: Joi.string().min(2).max(100).required(),
  }),
});

module.exports = {
  validationUserData,
  validationLogin,
  validationId,
  validationUpdateProfile,
  validationMovieData,
  validationUrl,
};
