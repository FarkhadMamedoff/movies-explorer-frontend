import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import useMovies from '../../hooks/useMovies'

export default function MoviesCardList({ movies, onMovieLike, onMovieDelete, savedMovies }) {
  const { isMovieSaved } = useMovies();
  return (
    <div className="movies-cardlist">
      {movies.map((movie) => {
        return (
          <MoviesCard key={movie.id || movie.movieId}
            movie={movie}
            onMovieLike={onMovieLike}
            onMovieDelete={onMovieDelete}
            isSaved={isMovieSaved(movie, savedMovies)} />
        );
      })}
    </div>
  )
}