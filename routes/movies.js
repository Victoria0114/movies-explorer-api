const router = require('express').Router();
const { moviesValidate, deleteMovieValidate } = require('../middlewares/validation');

const {
  createMovie, getMovies, deleteMovie,
} = require('../controllers/movie');

router.get('/', getMovies);
router.post('/', moviesValidate, createMovie);
router.delete('/:id', deleteMovieValidate, deleteMovie);

module.exports = router;
