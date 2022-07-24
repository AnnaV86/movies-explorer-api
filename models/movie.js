const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Обязательное поле для заполнения'],
  },
  director: {
    type: String,
    required: [true, 'Обязательное поле для заполнения'],
  },
  duration: {
    type: Number,
    required: [true, 'Обязательное поле для заполнения'],
  },
  year: {
    type: String,
    required: [true, 'Обязательное поле для заполнения'],
  },
  description: {
    type: String,
    required: [true, 'Обязательное поле для заполнения'],
  },
  image: {
    type: String,
    required: [true, 'Обязательное поле для заполнения'],
  },
  trailerLink: {
    type: String,
    required: [true, 'Обязательное поле для заполнения'],
  },
  thumbnail: {
    type: String,
    required: [true, 'Обязательное поле для заполнения'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: mongoose.ObjectId,
    required: [true, 'Обязательное поле'],
  },
  nameRU: {
    type: String,
    required: [true, 'Обязательное поле для заполнения'],
  },
  nameEN: {
    type: String,
    required: [true, 'Обязательное поле для заполнения'],
  },
});

module.exports = mongoose.model('movie', movieSchema);
