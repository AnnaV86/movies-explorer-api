const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getMovies, postMovies, deleteMovies } = require('../controllers/movies');
const { validationUrl } = require('../utils/validationUrl');

// Возвращает все сохраненные текущим пользователем фильмы GET  /movies
router.get('/movies', getMovies);

// Создает фильм с переданными данными POST /movies
router.post('/movies',
  celebrate({
    body: Joi.object().keys({
      country: ,
      director: ,
      duration: ,
      year: ,
      description: ,
      image: ,
      trailerLink: ,
      thumbnail: ,
      owner: ,
      movieId: ,
      nameRU: ,
      nameEN: ,
    }),
  }),
  postMovies);

// Удаляет сохраненный фильм по id DELETE /movies/_id
router.delete('/movies/_id', deleteMovies);
