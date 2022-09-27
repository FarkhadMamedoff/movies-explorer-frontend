const emailPattern = '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$';
const namePattern = '^[A-Za-zА-Яа-яЁё /s -]+$';
const urlPattern = new RegExp('(https?:\\/\\/)[a-zA-Z.:0-9-?]{2,}\\.[a-z]{2,}([-a-zA-Z0-9@:%_+.~#?&=/]*)');
const BASE_URL = 'https://api.movies.mfg.nomoredomains.sbs';
const MOVIES_URL = 'https://api.nomoreparties.co/beatfilm-movies';

const customNameMessage = 'Поле должно содержать только латиницу, кириллицу, пробел или дефис';
const customEmailMessage ='Неверный формат почты';
const serverErrorMessage ='Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';
const notFoundMessage ='Ничего не найдено';

const desktopMoviesCountsProperties = {
    width: 1100,
    moviesCount: 12,
    moreCount: 3
};
const tabletMoviesCountsProperties = {
  width: 708,
  moviesCount: 8,
  moreCount: 2
};
const mobileMoviesCountsProperties = {
  width: 707,
  moviesCount: 5,
  moreCount: 2
};

export {
  namePattern,
  emailPattern,
  urlPattern,
  BASE_URL,
  MOVIES_URL,
  customNameMessage,
  customEmailMessage,
  serverErrorMessage,
  notFoundMessage,
  desktopMoviesCountsProperties,
  tabletMoviesCountsProperties,
  mobileMoviesCountsProperties,
};