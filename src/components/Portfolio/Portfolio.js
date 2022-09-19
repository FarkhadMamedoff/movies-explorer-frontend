import './Portfolio.css';

export default function Portfolio() {
  return (
    <section className="portfolio">
      <div className="portfolio__block">
        <h2 className="portfolio__title">Портфолио</h2>
        <ul className="portfolio__links">
          <li className="portfolio__link-container">
            <a href="https://github.com/FarkhadMamedoff/how-to-learn" className="portfolio__link" target="_blank" rel="noreferrer">
              <p className="portfolio__link-title">Статичный сайт</p>
              <div className="portfolio__link-arrow"></div>
            </a>
          </li>
          <li className="portfolio__link-container">
            <a href="https://farkhadmamedoff.github.io/russian-travel/" className="portfolio__link" target="_blank" rel="noreferrer">
              <p className="portfolio__link-title">Адаптивный сайт</p>
              <div className="portfolio__link-arrow"></div>
            </a>
          </li>
          <li className="portfolio__link-container">
            <a href="https://mesto.mfg.nomoredomains.sbs" className="portfolio__link" target="_blank" rel="noreferrer">
              <p className="portfolio__link-title">Одностраничное приложение</p>
              <div className="portfolio__link-arrow"></div>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}