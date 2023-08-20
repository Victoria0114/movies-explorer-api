const router = require('express').Router();

const usersRouter = require('./users');
const moviesRouter = require('./movies');

const auth = require('../middlewares/auth');
const { register, login } = require('../controllers/user');
const { authValidate, registerValidate } = require('../middlewares/validation');
const authLimiter = require('../utils/limiter');

const NotFoundError = require('../errors/NotFoundError');
const { pageNotFoundMessage } = require('../utils/errorMessages');

router.post('/signup', registerValidate, register);
router.post('/signin', authValidate, login);

router.use(auth);

router.use('/movies', authLimiter, moviesRouter);
router.use('/users', authLimiter, usersRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError(pageNotFoundMessage));
});

module.exports = router;
