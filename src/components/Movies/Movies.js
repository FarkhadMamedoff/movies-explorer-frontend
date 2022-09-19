import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import { useLocation } from 'react-router-dom';

export default function Movies(props) {
  const location = useLocation();
  return (
    <main className="movies">
      <div className="movies__block">
        <div className="movies__search-container">
          <SearchForm />
        </div>
        {props.isOpened && <Preloader />}
        <MoviesCardList movies={props.movies} />
        {location.pathname === "/movies" && (
          <button className="movies__show-more-button">Еще</button>
        )}
      </div>
    </main>
  )
}