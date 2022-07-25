const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getProfile, updateProfile } = require('../controllers/users');

// Получение информации о пользователе GET users/me (email и имя)
router.get('/users/me', getProfile);

// Обновляет информацию о пользователе PATCH users/me (email и имя)
router.patch(
  '/users/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      email: Joi.string().required().email(),
    }),
  }),
  updateProfile,
);

module.exports = router;
