const badRequestMessage = 'Переданы некорректные данные';
const notFoundMessage = 'Запрашиваемые данные по указанному id не найдены';
const forbiddenMessage = 'Нельзя удалять чужие карточки';
const alreadyExistMessage = 'Пользователь с такой почтой уже существует';
const authorizationMessage = 'Необходима авторизация';
const emailPasswordAuthorizationMessage = 'Неправильная почта или пароль';
const emailValidationMesssage = 'Неправильный формат почты';
const urlValidationMesssage = 'Неправильный формат ссылки';
const crashTestMessage = 'Сервер сейчас упадёт';
const pageNotFoundMessage = 'Страница не найдена';
const internalServerErrorMessage = 'На сервере произошла ошибка';
const serverErrorMessage = 'Ошибка сервера';

module.exports = {
  notFoundMessage,
  badRequestMessage,
  forbiddenMessage,
  alreadyExistMessage,
  authorizationMessage,
  emailPasswordAuthorizationMessage,
  emailValidationMesssage,
  urlValidationMesssage,
  crashTestMessage,
  pageNotFoundMessage,
  internalServerErrorMessage,
  serverErrorMessage,
};
