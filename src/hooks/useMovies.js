export default function useMovies() {
  function findMovies(movies, findQuery, findShortMovies) {
    const res = movies.filter((movie) => {
      const nameRu = String(movie.nameRU).toLowerCase().trim();
      const nameEn = String(movie.nameEN).toLowerCase().trim();
      const query = findQuery.toLowerCase().trim();
      return nameRu.indexOf(query) !== -1 || nameEn.indexOf(query) !== -1;
    });

    if (findShortMovies) {
      return res.filter((movie) => movie.duration < 40);
    } else {
      return res;
    }
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
    });
    return movies;
  }

  return { findMovies, convertDuration, isMovieSaved, convertMoviesImages };
}