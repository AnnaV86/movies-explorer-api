const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const {
  MESSAGE_STATUS,
  MESSAGE_MIN_LENGTH_2,
  MESSAGE_MIN_LENGTH_8,
  MESSAGE_MAX_LENGTH_100,
} = require('../constants/index');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, MESSAGE_STATUS],
    unique: true,
    validate: [validator.isEmail, 'Некорректный email'],
  },
  password: {
    type: String,
    required: [true, MESSAGE_STATUS],
    minlength: [8, MESSAGE_MIN_LENGTH_8],
    select: false,
  },
  name: {
    type: String,
    minlength: [2, MESSAGE_MIN_LENGTH_2],
    maxlength: [100, MESSAGE_MAX_LENGTH_100],
  },
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
