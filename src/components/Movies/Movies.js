import './Movies.css';
import React from "react";
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useLocation } from 'react-router-dom';
import {
  serverErrorMessage, notFoundMessage,
  desktopMoviesCountsProperties,
  tabletMoviesCountsProperties,
  mobileMoviesCountsProperties
} from '../../utils/constants';
import MoviesApi from '../../utils/moviesApi';
import useDeviceScreenWidth from '../../hooks/useDeviceScreenWidth';
import useMovies from '../../hooks/useMovies';

export default function Movies({ savedMovies, onMovieLike, onMovieDelete, onOpenTooltip, onRunPreloader }) {
  const location = useLocation();
  const [isNotFound, setIsNotFound] = React.useState(false);
  const [isSearch, setIsSearch] = React.useState(false);
  const [findQuery, setFindQuery] = React.useState('');
  const [isSearchShortFilms, setIsSearchShortFilms] = React.useState(false);
  const [allMovies, setAllMovies] = React.useState([]);
  const [moviesToShow, setMoviesToShow] = React.useState([]);
  const [cutMoviesToShow, setCutMoviesToShow] = React.useState([]);
  const [isEmpty, setIsEmpty] = React.useState(true);
  const [moviesToShowCount, setMoviesToShowCount] = React.useState({ moviesCount: 12, moreCount: 3 });

  const { findMovies, convertMoviesImages } = useMovies();
  const screenWidth = useDeviceScreenWidth();

  const isSavedMovies = location.pathname === '/saved-movies';

  const hasMovies = cutMoviesToShow.length >= 5 && cutMoviesToShow.length < moviesToShow.length;

  React.useEffect(() => {
    const savedQuery = localStorage.getItem(isSavedMovies ? 'savedQuery' : 'query');
    const savedFindShotMovies = localStorage.getItem(isSavedMovies ? 'savedfindShortMovies' : 'findShortMovies');
    const savedLocalMovies = JSON.parse(localStorage.getItem('moviesToShow'));
    if (savedLocalMovies) {
      setMoviesToShow(savedLocalMovies);
      setIsEmpty(false);
    }
    setFindQuery(savedQuery);
    if (savedFindShotMovies === 'true') {
      setIsSearchShortFilms(true);
    } else {
      setIsSearchShortFilms(false);
    }
  }, [isSavedMovies]);

  React.useEffect(() => {
    if (!isSavedMovies) {
      if (screenWidth > desktopMoviesCountsProperties.width) {
        setMoviesToShowCount({ moviesCount: desktopMoviesCountsProperties.moviesCount, moreCount: desktopMoviesCountsProperties.moreCount });
      } else if (screenWidth <= desktopMoviesCountsProperties.width && screenWidth > mobileMoviesCountsProperties.width) {
        setMoviesToShowCount({ moviesCount: tabletMoviesCountsProperties.moviesCount, moreCount: tabletMoviesCountsProperties.moreCount });
      } else {
        setMoviesToShowCount({ moviesCount: mobileMoviesCountsProperties.moviesCount, moreCount: mobileMoviesCountsProperties.moreCount });
      }
    }
  }, [screenWidth, location.pathname, isSavedMovies]);


  React.useEffect(() => {
    if (moviesToShow.length) {
      const res = moviesToShow.filter((item, i) => i < moviesToShowCount.moviesCount);
      setCutMoviesToShow(res);
    }
  }, [moviesToShow, moviesToShowCount.moviesCount]);

  React.useEffect(() => {
    if (isSavedMovies) {
      setAllMovies(savedMovies);
    }
    if (allMovies.length !== 0) {
      setIsEmpty(false);
    }
  }, [allMovies, isSavedMovies, location.pathname, savedMovies]);


  function handleSerchShortFilms(isSearchShortFilms) {
    setIsSearchShortFilms(!isSearchShortFilms);
  }

  function search(movies, query, searchShorts) {
    const foundMovies = findMovies(movies, query, searchShorts);
    setIsSearch(true);
    if (foundMovies.length === 0) {
      setIsNotFound(true);
    } else {
      setIsNotFound(false);
      setMoviesToShow(foundMovies);
    }
    if (!isSavedMovies) {
      localStorage.setItem('moviesToShow', JSON.stringify(foundMovies));
    }
  }


  function handleSearch(newQuery) {
    localStorage.setItem(isSavedMovies ? 'savedQuery' : 'query', newQuery);
    localStorage.setItem(isSavedMovies ? 'savedfindShortMovies' : 'findShortMovies', isSearchShortFilms);
    onRunPreloader(true);
    if (allMovies.length === 0) {
      MoviesApi.getInitialMovies()
        .then(movies => {
          setAllMovies(convertMoviesImages(movies));
          search(movies, newQuery, isSearchShortFilms);
        })
        .catch(() => {
          onOpenTooltip(true, serverErrorMessage);
        })
        .finally(() => onRunPreloader(false));
    } else {
      search(allMovies, newQuery, isSearchShortFilms);
      onRunPreloader(false);
    }
  }

  function handleClick() {
    const end = cutMoviesToShow.length + moviesToShowCount.moreCount;
    if (moviesToShow.length - cutMoviesToShow.length > 0) {
      const newMovies = moviesToShow.slice(cutMoviesToShow.length, end);
      setCutMoviesToShow([...cutMoviesToShow, ...newMovies]);
    }
  }

  return (
    <main className="movies">
      <div className="movies__block">
        <div className="movies__search-container">
          <SearchForm
            isSearch={isSearchShortFilms}
            onSearchShortFilms={handleSerchShortFilms}
            onSearch={handleSearch}
            defaultQuery={findQuery} />
        </div>
        {!isEmpty ? (!isNotFound ?
          <MoviesCardList movies={isSavedMovies ? !isSearch ? savedMovies : moviesToShow : cutMoviesToShow}
            onMovieLike={onMovieLike}
            onMovieDelete={onMovieDelete}
            savedMovies={savedMovies} />
          : <p className="movies__error-text">{notFoundMessage}</p>)
          : ''}
        {location.pathname === "/movies" && !isNotFound && !isEmpty && hasMovies && (
          <button className="movies__show-more-button" onClick={handleClick}>Еще</button>
        )}
      </div>
    </main>
  )
}