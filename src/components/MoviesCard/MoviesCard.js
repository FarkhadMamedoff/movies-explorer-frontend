import './MoviesCard.css';
import { useLocation } from 'react-router-dom';
import useMovies from '../../hooks/useMovies';

export default function MoviesCard({ movie, onMovieLike, onMovieDelete, isSaved }) {
  const location = useLocation();
  const { convertDuration } = useMovies();
  const isMovies = location.pathname === '/movies';
  const isSavedMovies = location.pathname === '/saved-movies';

  const moviesCardLikeButtonClassName = (
    `movies-card__button
     ${isMovies ?
      isSaved ? 'movies-card__button_type_like-default movies-card__button_type_like-active' : 'movies-card__button_type_like-default'
      : isSavedMovies ? 'movies-card__button_type_remove' : ''}`
  );

  function handleLike() {
    onMovieLike(movie);
  }

  function handleDelete() {
    onMovieDelete(movie);
  }

  return (
    <article className="movies-card" >
      <a href={movie.trailerLink} className="movies-card__link" target="_blank" rel="noreferrer">
        <img src={movie.image} alt={movie.description} className="movies-card__image" />
      </a>
      <div className="movies-card__container">
        <h2 className="movies-card__title">{movie.nameRU || movie.nameEN}</h2>
        <button type="button" className={moviesCardLikeButtonClassName} onClick={!isSavedMovies ? (isSaved ? handleDelete : handleLike) : handleDelete}></button>
      </div>
      <p className="movies-card__duration">{convertDuration(movie.duration)}</p>
    </article >
  )
}