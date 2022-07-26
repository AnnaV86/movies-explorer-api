const Movie = require('../models/movie');
const { messagesError } = require('../utils/messagesError');
const NotFoundError = require('../errors/notFoundError');
const BadRequestError = require('../errors/badRequestError');
const ForbiddenError = require('../errors/forbiddenError');
const User = require('../models/user');

// Возвращает все сохраненные текущим пользователем фильмы GET  /movies
module.exports.getMovies = async (req, res, next) => {
  const owner = await User.findById(req.user._id);
  Movie.find({})
    .populate('owner')
    .then((result) => {
      const sortResult = result.filter((el) => el.owner._id.toString() === owner._id.toString());
      return res.send(sortResult);
    })
    .catch(next);
};

// Создает фильм с переданными данными POST /movies
module.exports.createMovies = async (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = await User.findById(req.user._id);
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then(async (movie) => res.send(movie))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequestError(`Переданы некорректные данные в полях: ${messagesError(error)}`));
      }
      next(error);
    });
};

// Удаляет сохраненный фильм по id DELETE /movies/:_id
module.exports.deleteMovies = (req, res, next) => {
  Movie.findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм с указанным _id не найден.');
      } else if (String(movie.owner._id) !== req.user._id) {
        throw new ForbiddenError('Запрет на удаление чужого фильма.');
      } else {
        movie.remove()
          .then(() => res.status(200).send({ message: 'Фильм удалён' }));
      }
    }).catch(next);
};
