const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const FORBIDDEN = 403;
const NOT_FOUND = 404;
const CONFLICT = 409;
const INTERVAL_SERVER_ERROR = 500;

const MESSAGE_STATUS = 'Обязательное поле для заполнения';
const MESSAGE_MIN_LENGTH_2 = 'Минимальная длина 2 символа';
const MESSAGE_MIN_LENGTH_8 = 'Минимальная длина 8 символа';
const MESSAGE_MAX_LENGTH_100 = 'Минимальная длина 100 символов';
const MESSAGE_LENGTH_4 = 'Длина поля 4 символа';

const MESSAGE_NONEXISTENT_RESOURCE = 'Запрошен не существующий ресурс';
const MESSAGE_ERROR_URL = 'Ошибка url';
const MESSAGE_INTERVAL_SERVER_ERROR = 'На сервере произошла ошибка';
const MESSAGE_ERROR_UNAUTHORIZED = 'Ошибка авторизации';
const MESSAGE_INCORRECT_EMAIL_OR_PASSWORD = 'Неправильные почта или пароль';
const MESSAGE_NOT_FOUND_USER_ID = 'Нет пользователя с таким id';
const MESSAGE_INCORRECT_DATA = 'Переданы некорректные данные в полях:';
const MESSAGE_CONFLICT_EMAIL = 'Пользователем с данным email уже зарегистрирован';
const MESSAGE_NOT_FOUND_USER_THIS_ID = 'Пользователь по указанному id не найден';
const MESSAGE_NOT_FOUND_MOVIES_ID = 'Фильм с указанным _id не найден.';
const MESSAGE_FORBIDDEN_DELETE_MOVIE = 'Запрет на удаление чужого фильма.';

const VALIDATOR_ERROR = 'ValidationError';
const LOGIN_COMPLETED = 'Вход выполнен';
const MOVIE_DELETED = 'Фильм удалён';

module.exports = {
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  CONFLICT,
  INTERVAL_SERVER_ERROR,
  MESSAGE_STATUS,
  MESSAGE_MIN_LENGTH_2,
  MESSAGE_MIN_LENGTH_8,
  MESSAGE_MAX_LENGTH_100,
  MESSAGE_LENGTH_4,
  MESSAGE_NONEXISTENT_RESOURCE,
  MESSAGE_ERROR_URL,
  MESSAGE_INTERVAL_SERVER_ERROR,
  MESSAGE_ERROR_UNAUTHORIZED,
  MESSAGE_INCORRECT_EMAIL_OR_PASSWORD,
  MESSAGE_NOT_FOUND_USER_ID,
  MESSAGE_INCORRECT_DATA,
  MESSAGE_CONFLICT_EMAIL,
  MESSAGE_NOT_FOUND_USER_THIS_ID,
  MESSAGE_NOT_FOUND_MOVIES_ID,
  MESSAGE_FORBIDDEN_DELETE_MOVIE,
  VALIDATOR_ERROR,
  LOGIN_COMPLETED,
  MOVIE_DELETED,
};
