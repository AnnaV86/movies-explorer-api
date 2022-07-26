const router = require('express').Router();
const { getProfile, updateProfile } = require('../controllers/users');
const { validationId, validationUpdateProfile } = require('../middleware/validations');

// Получение информации о пользователе GET users/me (email и имя)
router.get('/users/me', validationId, getProfile);

// Обновляет информацию о пользователе PATCH users/me (email и имя)
router.patch(
  '/users/me',
  validationUpdateProfile,
  updateProfile,
);

module.exports = router;
