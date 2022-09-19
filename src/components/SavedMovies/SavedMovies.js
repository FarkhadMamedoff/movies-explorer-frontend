import Movies from '../Movies/Movies';

export default function SavedMovies(props) {
  const currentUserId = 1;
  const savedMovies = props.movies.filter(card => {
    return (card.owner === currentUserId);
  });
  return (
    <Movies movies={savedMovies} />
  )
}