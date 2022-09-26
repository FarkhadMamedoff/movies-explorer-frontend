import './App.css';
import React from "react";
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import Preloader from '../Preloader/Preloader';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useCloseByOverlayAndEsc from '../../hooks/useCloseByOverlayAndEsc';
import MainApi from '../../utils/mainApi';
import { useLocation } from 'react-router-dom';

export default function App() {
  const location = useLocation();
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isPreloaderOpen, setIsPreloaderOpen] = React.useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [isRegFormError, setIsRegFormError] = React.useState(false);
  const [isLogFormError, setIsLogFormError] = React.useState(false);
  const [message, setMessage] = React.useState('');

  useCloseByOverlayAndEsc(onBurgerClick, closeInfoTooltip, isInfoTooltipOpen, isBurgerOpen);


  React.useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      setIsPreloaderOpen(true);
      MainApi.checkToken(token)
        .then((res) => {
          setCurrentUser(res);
          setIsLoggedIn(true);
          history.push(location.pathname);
        })
        .catch((err) => {
          openInfoTooltip(true, err);
        })
        .finally(() => setIsPreloaderOpen(false));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (isLoggedIn) {
      MainApi.getSavedMovies()
        .then((res) => {
          const movies = res.filter((m) => m.owner === currentUser._id);
          setSavedMovies(movies);
        })
        .catch((err) => {
          openInfoTooltip(true, err);
        })
    }
  }, [currentUser._id, isLoggedIn]);


  function returntoPrevious() {
    history.goBack();
  }

  function onBurgerClick(isBurgerOpen) {
    setIsBurgerOpen(!isBurgerOpen);
  }

  function closeInfoTooltip() {
    setIsInfoTooltipOpen(false);
  }

  function openInfoTooltip(hasErrors, messageText) {
    setIsError(hasErrors);
    setMessage(messageText);
    setIsInfoTooltipOpen(true);
  }

  function activatePreloader(state) {
    setIsPreloaderOpen(state);
  }

  function checkToken() {
    const token = localStorage.getItem('jwt');
    if (token) {
      MainApi.checkToken(token)
        .then((res) => {
          setCurrentUser(res);
          setIsLoggedIn(true);
          history.push('/movies');
        })
        .catch((err) => {
          openInfoTooltip(true, err);
        });
    } else {
      return;
    }
  }
  function handleLogin(info) {
    setIsPreloaderOpen(true);
    setIsRegFormError(false);
    MainApi.login(info)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        checkToken();
        openInfoTooltip(false, 'Рады видеть!');
        setIsLogFormError(false);
      })
      .catch((err) => {
        setIsLogFormError(true);
        setMessage(err);
      })
      .finally(() => setIsPreloaderOpen(false));
  }

  function handleRegister(info) {
    setIsPreloaderOpen(true);
    setIsLogFormError(false);
    MainApi.register(info)
      .then((res) => {
        const { email, password } = info;
        if (res) {
          handleLogin({ email, password });
          setIsRegFormError(false);
        }
      })
      .catch((err) => {
        setIsRegFormError(true);
        setMessage(err);
      })
      .finally(() => setIsPreloaderOpen(false));
  }

  function handleUpdateUserInfo(info) {
    setIsPreloaderOpen(true);
    MainApi.updateUserInfo(info)
      .then((res) => {
        setCurrentUser({
          ...currentUser,
          name: res.name,
          email: res.email
        });
        openInfoTooltip(false, 'Данные успешно обновлены!');
      })
      .catch((err) => {
        openInfoTooltip(true, err);
      })
      .finally(() => setIsPreloaderOpen(false));
  }

  function handleSignOut() {
    window.localStorage.clear();
    history.push('/');
    setCurrentUser({});
    setIsLoggedIn(false);
  }

  function handleSaveMovie(movie) {
    setIsPreloaderOpen(true);
    const movieToSave =
    {
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: movie.image,
      trailerLink: movie.trailerLink,
      thumbnail: movie.thumbnail,
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    };

    MainApi.addNewMovie(movieToSave)
      .then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies]);
      })
      .catch((err) => {
        openInfoTooltip(true, err);
      })
      .finally(() => setIsPreloaderOpen(false));
  }

  function handleDeleteMovie(movie) {
    setIsPreloaderOpen(true);

    const movieToDelete = savedMovies.find((m) => m.movieId === (movie.movieId || movie.id));
    MainApi.deleteMovie(movieToDelete._id)
      .then(() => {
        setSavedMovies(savedMovies.filter((m) => m.movieId !== (movie.movieId || movie.id)));
      })
      .catch((err) => {
        openInfoTooltip(true, err);
      })
      .finally(() => setIsPreloaderOpen(false));
  }

  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
        <Route exact path={["/", "/movies", "/saved-movies", "/profile"]}>
          <Header isLoggedIn={isLoggedIn} isOpen={isBurgerOpen} onMenuOpen={onBurgerClick} />
        </Route>
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route path="/sign-up">
            {!isLoggedIn ? (
              <Register onRegister={handleRegister} isRegError={isRegFormError} errorMessage={message} />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route path="/sign-in">
            {!isLoggedIn ? (
              <Login onLogin={handleLogin} isLogError={isLogFormError} errorMessage={message} />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <ProtectedRoute
            exact path="/movies"
            isLoggedIn={isLoggedIn}
            component={Movies}
            savedMovies={savedMovies}
            onMovieLike={handleSaveMovie}
            onMovieDelete={handleDeleteMovie}
            onOpenTooltip={openInfoTooltip}
            onRunPreloader={activatePreloader}
          />
          <ProtectedRoute
            exact path="/saved-movies"
            isLoggedIn={isLoggedIn}
            component={SavedMovies}
            savedMovies={savedMovies}
            onMovieDelete={handleDeleteMovie}
            onOpenTooltip={openInfoTooltip}
            onRunPreloader={activatePreloader}
          />
          <ProtectedRoute
            exact path="/profile"
            isLoggedIn={isLoggedIn}
            component={Profile}
            onSignOut={handleSignOut}
            onUpdate={handleUpdateUserInfo}
          />
          <Route path="*">
            <NotFound returntoPrevious={returntoPrevious} />
          </Route>
        </Switch>
        <Route exact path={["/", "/movies", "/saved-movies"]}>
          <Footer />
        </Route>

        <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeInfoTooltip} isError={isError} messageText={message} />
        <Preloader isOpen={isPreloaderOpen} />
      </CurrentUserContext.Provider>
    </div>
  )
}