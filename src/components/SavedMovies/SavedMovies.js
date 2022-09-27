import Movies from '../Movies/Movies';

export default function SavedMovies({ savedMovies, onMovieDelete, onOpenTooltip, onRunPreloader }) {
  return (
    <Movies
      savedMovies={savedMovies}
      onMovieDelete={onMovieDelete}
      onOpenTooltip={onOpenTooltip}
      onRunPreloader={onRunPreloader} />
  )
}