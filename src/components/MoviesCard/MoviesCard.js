import './MoviesCard.css';
import { useLocation } from 'react-router-dom';

export default function MoviesCard(props) {
  const location = useLocation();
  const currentUserId = 1;
  const isSaved = props.card.owner === currentUserId;
  const isMovies = location.pathname === '/movies';
  const isSavedMovies = location.pathname === '/saved-movies';

  const moviesCardLikeButtonClassName = (
    `movies-card__button
     ${isMovies ?
      isSaved ? 'movies-card__button_type_like-default movies-card__button_type_like-active' : 'movies-card__button_type_like-default'
      : isSavedMovies ? 'movies-card__button_type_remove' : ''}`
  );

  return (
    <article className="movies-card" >
      <img src={props.card.image} alt={props.card.title} className="movies-card__image" />
      <div className="movies-card__container">
        <h2 className="movies-card__title">{props.card.title}</h2>
        <button type="button" className={moviesCardLikeButtonClassName}></button>
      </div>
      <p className="movies-card__duration">{props.card.duration}</p>
    </article >
  )
}