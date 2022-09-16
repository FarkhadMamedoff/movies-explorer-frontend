import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__block">
        <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
        <div className="footer__info">
          <div className="footer__copyright">&copy; 2022</div>
          <nav className="footer__links">
            <a
              href="https://practicum.yandex.ru/web/"
              className="footer__link"
              target="_blank"
              rel="noreferrer"
            >
              Яндекс.Практикум
            </a>
            <a href="https://github.com/FarkhadMamedoff" className="footer__link" target="_blank" rel="noreferrer">Github</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}