const router = require('express').Router();
const { getMovies, createMovies, deleteMovies } = require('../controllers/movies');
const { validationId, validationMovieData } = require('../middleware/validations');

// Возвращает все сохраненные текущим пользователем фильмы GET  /movies
router.get('/movies', validationId, getMovies);

// Создает фильм с переданными данными POST /movies
router.post(
  '/movies',
  validationMovieData,
  createMovies,
);

// Удаляет сохраненный фильм по id DELETE /movies/_id
router.delete(
  '/movies/:_id',
  validationId,
  deleteMovies,
);

module.exports = router;
