const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const { emailValidationMesssage, urlValidationMesssage } = require('../utils/errorMessages');

// const urlCheckPattern = /https?:\/\/(www\.)?[a-zA-Z\d-]+\.[\w\d\-.~:/?#[\]@!$&'()*+,;=]{2,}#?/;

const isEmailValidation = (value, helpers) => {
  if (validator.isEmail(value)) {
    return value;
  }
  return helpers.message(emailValidationMesssage);
};

const isURLValidation = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.message(urlValidationMesssage);
};

const authValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const registerValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const userValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().email().required(),
  }),
});

const moviesValidate = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(isURLValidation),
    // image: Joi.string().required().pattern(urlCheckPattern),
    trailerLink: Joi.string().required().custom(isURLValidation),
    thumbnail: Joi.string().required().custom(isURLValidation),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const deleteMovieValidate = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  authValidate,
  registerValidate,
  userValidate,
  moviesValidate,
  deleteMovieValidate,
  isEmailValidation,
};
