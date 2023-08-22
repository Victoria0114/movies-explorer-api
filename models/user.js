const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { emailPasswordAuthorizationMessage, emailValidationMesssage } = require('../utils/errorMessages');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Поле "email" должно быть заполнено.'],
      unique: true,
      validate: {
        validator: (email) => validator.isEmail(email),
        message: emailValidationMesssage,
      },
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    name: {
      type: String,
      required: true,
      minlength: [2, 'Минимальная длина поля "name" - 2'],
      maxlength: [30, 'Максимальная длина поля "name" - 30'],
    },

  },

  {
    versionKey: false,
    statics: {
      findUserByCredentials(email, password) {
        return this
          .findOne({ email })
          .select('+password')
          .then((user) => {
            if (user) {
              return bcrypt.compare(password, user.password)
                .then((matched) => {
                  if (matched) return user;

                  throw new UnauthorizedError(emailPasswordAuthorizationMessage);
                });
            }

            throw new UnauthorizedError(emailPasswordAuthorizationMessage);
          });
      },
    },
  },
);

module.exports = mongoose.model('user', userSchema);
