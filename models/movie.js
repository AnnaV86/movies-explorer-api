const mongoose = require('mongoose');
const {
  MESSAGE_STATUS,
  MESSAGE_MIN_LENGTH_2,
  MESSAGE_MAX_LENGTH_100,
  MESSAGE_LENGTH_4,
} = require('../constants/index');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, MESSAGE_STATUS],
    minlength: [2, MESSAGE_MIN_LENGTH_2],
    maxlength: [100, MESSAGE_MAX_LENGTH_100],
  },
  director: {
    type: String,
    required: [true, MESSAGE_STATUS],
    minlength: [2, MESSAGE_MIN_LENGTH_2],
    maxlength: [100, MESSAGE_MAX_LENGTH_100],
  },
  duration: {
    type: Number,
    required: [true, MESSAGE_STATUS],
  },
  year: {
    type: String,
    required: [true, MESSAGE_STATUS],
    length: [4, MESSAGE_LENGTH_4],
  },
  description: {
    type: String,
    required: [true, MESSAGE_STATUS],
    minlength: [2, MESSAGE_MIN_LENGTH_2],
  },
  image: {
    type: String,
    required: [true, MESSAGE_STATUS],
  },
  trailerLink: {
    type: String,
    required: [true, MESSAGE_STATUS],
  },
  thumbnail: {
    type: String,
    required: [true, MESSAGE_STATUS],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: String,
    required: true,
  },
  nameRU: {
    type: String,
    required: [true, MESSAGE_STATUS],
    minlength: [2, MESSAGE_MIN_LENGTH_2],
    maxlength: [100, MESSAGE_MAX_LENGTH_100],
  },
  nameEN: {
    type: String,
    required: [true, MESSAGE_STATUS],
    minlength: [2, MESSAGE_MIN_LENGTH_2],
    maxlength: [100, MESSAGE_MAX_LENGTH_100],
  },
});

module.exports = mongoose.model('movie', movieSchema);
