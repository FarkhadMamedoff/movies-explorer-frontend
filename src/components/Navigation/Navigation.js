import './Navigation.css';
import { Link, NavLink } from 'react-router-dom';
import Burger from '../Burger/Burger';

export default function Navigation(props) {

  return (
    <>
      {!props.isLoggedIn ? (
        <nav className="navigation">
          <Link to="/sign-up" className="navigation__link">
            Регистрация
          </Link>
          <Link to="/sign-in" className="navigation__link navigation__link_type_sign-in">
            Войти
          </Link>
        </nav>
      ) : (
        <nav className="navigation">
          <Burger isOpen={props.isOpen} onMenuOpen={props.onMenuOpen} />
          <div className={`navigation__background navigation__background_state_closed ${props.isOpen && 'navigation__background_state_opened'}`}>
            <ul className={`navigation__block navigation__block_state_logged-in navigation__block_state_closed ${props.isOpen && 'navigation__block_state_opened'}`}>
              {props.isOpen && (
                <li className="navigation__link-container">
                  <NavLink exact to="/" className="navigation__link navigation__link_state_logged navigation__link_type_main" activeClassName="navigation__link_type_active">
                    Главная
                  </NavLink>
                </li>
              )}
              <li className="navigation__link-container">
                <NavLink exact to="/movies" className="navigation__link navigation__link_state_logged" activeClassName="navigation__link_type_active">
                  Фильмы
                </NavLink>
              </li>
              <li className="navigation__link-container">
                <NavLink exact to="/saved-movies" className={`navigation__link navigation__link_state_logged ${!props.isOpen && 'navigation__link_type_saved-films'}`} activeClassName="navigation__link_type_active">
                  Сохраненные фильмы
                </NavLink>
              </li>
              <li className="navigation__link-container">
                <NavLink exact to="/profile" className="navigation__link navigation__link_type_account" activeClassName="navigation__link_type_active">
                  Аккаунт
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      )}
    </>
  );
}