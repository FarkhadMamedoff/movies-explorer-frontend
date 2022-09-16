import './App.css';
import React from "react";
import { Route, Switch, useHistory } from 'react-router-dom';
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
import template from '../../images/test.jpg';

const moviesData = [
  {
    "_id": "1",
    "image": template,
    "title": "Movie 1",
    "duration": "1ч 42м",
    "owner": 1,
  },

  {
    "_id": "2",
    "image": template,
    "title": "Movie 2",
    "owner": 0,
  },

  {
    "_id": "3",
    "image": template,
    "title": "Movie 3",
    "duration": "1ч 42м",
    "owner": 1,
  },

  {
    "_id": "4",
    "image": template,
    "title": "Movie 4",
    "duration": "1ч 42м",
    "owner": 1,
  },
  {
    "_id": "5",
    "image": template,
    "title": "Movie 5",
    "duration": "1ч 42м",
    "owner": 0,
  },
];

export default function App() {
  const history = useHistory();
  const [movies, setMovies] = React.useState([]);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isPreloaderOpen, setIsPreloaderOpen] = React.useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isError, setIsError] = React.useState(false);


  function returntoPrevious() {
    history.goBack();
  };

  function onBurgerClick(isBurgerOpen) {
    setIsBurgerOpen(!isBurgerOpen);
  };

  React.useEffect(() => {
    setMovies(moviesData);
    setIsPreloaderOpen(false);
    setIsLoggedIn(false);

    setIsError(false);
    setIsInfoTooltipOpen(false);
  }, []);

  function close() {
    setIsInfoTooltipOpen(false);
  }
  return (
    <div className="app">
      <Switch>
        <Route path="/" exact>
          <Header isLoggedIn={isLoggedIn} isOpen={isBurgerOpen} onMenuOpen={onBurgerClick} />
          <Main />
          <Footer />
        </Route>
        <Route path="/movies">
          <Header isLoggedIn={isLoggedIn} isOpen={isBurgerOpen} onMenuOpen={onBurgerClick} />
          <Movies movies={movies} isOpened={isPreloaderOpen} />
          <Footer />
        </Route>
        <Route exact path="/saved-movies">
          <Header isLoggedIn={isLoggedIn} isOpen={isBurgerOpen} onMenuOpen={onBurgerClick} />
          <SavedMovies movies={movies} />
          <Footer />
        </Route>
        <Route exact path="/sign-up">
          <Register />
        </Route>
        <Route exact path="/sign-in">
          <Login />
        </Route>
        <Route exact path="/profile">
          <Header isLoggedIn={isLoggedIn} isOpen={isBurgerOpen} onMenuOpen={onBurgerClick} />
          <Profile />
        </Route>
        <Route path="*">
          <NotFound returntoPrevious={returntoPrevious} />
        </Route>
      </Switch>


      <InfoTooltip isOpen={isInfoTooltipOpen} onClose={close} isError={isError} />
    </div>
  )
}