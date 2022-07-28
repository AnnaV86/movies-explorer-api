const Movie = require('../models/movie');
const { messagesError } = require('../utils/messagesError');
const NotFoundError = require('../errors/notFoundError');
const BadRequestError = require('../errors/badRequestError');
const ForbiddenError = require('../errors/forbiddenError');
const User = require('../models/user');
const {
  VALIDATOR_ERROR,
  MESSAGE_INCORRECT_DATA,
  MESSAGE_NOT_FOUND_MOVIES_ID,
  MESSAGE_FORBIDDEN_DELETE_MOVIE,
  MOVIE_DELETED,
} = require('../constants/index');

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
      if (error.name === VALIDATOR_ERROR) {
        next(new BadRequestError(`${MESSAGE_INCORRECT_DATA} ${messagesError(error)}`));
      } else next(error);
    });
};

// Удаляет сохраненный фильм по id DELETE /movies/:_id
module.exports.deleteMovies = (req, res, next) => {
  Movie.findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(MESSAGE_NOT_FOUND_MOVIES_ID);
      } else if (String(movie.owner._id) !== req.user._id) {
        throw new ForbiddenError(MESSAGE_FORBIDDEN_DELETE_MOVIE);
      } else {
        return movie.remove()
          .then(() => res.send({ message: MOVIE_DELETED }));
      }
    }).catch(next);
};
