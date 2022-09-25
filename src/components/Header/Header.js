import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';

export default function Header({ isLoggedIn, isOpen, onMenuOpen }) {
  const location = useLocation();
  const isMain = location.pathname === '/';
  const headerClassName = (`header ${isMain ? 'header_theme_light' : 'header_theme_dark'}`);
  return (
    <header className={headerClassName}>
      <div className="header__block">
        <Link to="/" className="header__logo-container">
          <Logo />
        </Link>
        <Navigation isLoggedIn={isLoggedIn} isOpen={isOpen} onMenuOpen={onMenuOpen} />
      </div>
    </header>
  );
}