const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getMovies, createMovies, deleteMovies } = require('../controllers/movies');
const { validationUrl } = require('../utils/validationUrl');

// Возвращает все сохраненные текущим пользователем фильмы GET  /movies
router.get('/movies', getMovies);

// Создает фильм с переданными данными POST /movies
router.post(
  '/movies',
  celebrate({
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
  }),
  createMovies,
);

// Удаляет сохраненный фильм по id DELETE /movies/_id
router.delete(
  '/movies/:_id',
  celebrate({
    params: Joi.object().keys({
      _id: Joi.string().length(24).hex(),
    }),
  }),
  deleteMovies,
);

module.exports = router;
