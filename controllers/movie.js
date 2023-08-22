const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const {
  badRequestMessage,
  notFoundMessage,
  forbiddenMessage,
} = require('../utils/errorMessages');

const getMovies = (req, res, next) => {
  Movie
    .find({ owner: req.user._id }).sort({ createdAt: -1 })
    .then((movie) => {
      res.send(movie);
    })
    .catch((err) => next(err));
};

const createMovie = (req, res, next) => {
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
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner: req.user._id,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => {
      res.status(201).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(badRequestMessage));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.id)
    .orFail(new NotFoundError(notFoundMessage))
    .then((movie) => {
      if (movie.owner.toString() === req.user._id) {
        return movie.deleteOne();
      }
      throw new ForbiddenError(forbiddenMessage);
    })
    .then((removedMovie) => res.send(removedMovie))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(badRequestMessage));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
