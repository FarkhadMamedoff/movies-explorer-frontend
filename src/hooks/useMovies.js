import { urlPattern } from "../utils/constants";

export default function useMovies() {

  function getShortMovies(movies) {
    return movies.filter((movie) => movie.duration < 40);
  }

  function findMovies(movies, findQuery) {
    const res = movies.filter((movie) => {
      const nameRu = String(movie.nameRU).toLowerCase().trim();
      const nameEn = String(movie.nameEN).toLowerCase().trim();
      const query = findQuery.toLowerCase().trim();
      return nameRu.indexOf(query) !== -1 || nameEn.indexOf(query) !== -1;
    });
    return res;
  }

  function convertDuration(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    if (hours === 0) {
      return `${minutes}м`;
    } else {
      return `${hours}ч ${minutes}м`;
    }
  }

  function isMovieSaved(movie, movies) {
    const res = movies.find((item) => {
      return item.movieId === (movie.id || movie.movieId);
    });
    if (res) {
      return true;
    } else {
      return false;
    }
  }

  function convertMoviesImages(movies) {
    movies.forEach(movie => {
      movie.thumbnail = `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`;
      movie.image = `https://api.nomoreparties.co${movie.image.url}`;

      if (!movie.country) {
        movie.country = 'None';
      }
      if (!movie.nameEN) {
        movie.nameEN = 'None';
      }
      if (!urlPattern.test(movie.trailerLink)) {
        movie.trailerLink = 'https://youtube.com';
      }
    });
    return movies;
  }

  return { findMovies, getShortMovies, convertDuration, isMovieSaved, convertMoviesImages };
}