const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
// const UnauthorizedError = require('../errors/UnauthorizedError');

const { alreadyExistMessage, badRequestMessage, notFoundMessage } = require('../utils/errorMessages');

const { NODE_ENV, JWT_SECRET } = process.env;

const register = (req, res, next) => {
  const { name, email, password } = req.body;

  return bcrypt
    .hash(password, 10)
    .then((hash) => User
      .create({
        name,
        email,
        password: hash,
      }))
    .then((user) => {
      res.status(201).send({
        name: user.name,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(badRequestMessage));
      } else if (err.code === 11000) {
        next(new ConflictError(alreadyExistMessage));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User
    .findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret', {
        expiresIn: '7d',
      });
      res.send({ token });
    })
    .catch(next);
};

const getUser = (req, res, next) => {
  User
    .findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError(notFoundMessage);
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError(badRequestMessage));
      }
      return next(err);
    });
};

const updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User
    .findByIdAndUpdate(
      req.user._id,
      { name, email },
      { new: true, runValidators: true },
    )
    .orFail(() => {
      throw new NotFoundError(notFoundMessage);
    })
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(badRequestMessage));
      }
      return next(err);
    });
};

module.exports = {
  register,
  login,
  getUser,
  updateUser,
};
