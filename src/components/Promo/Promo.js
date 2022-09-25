import './Promo.css';
import landingLogo from '../../images/landing-logo.svg';

export default function Promo() {
  return (
    <section className="promo">
      <div className="promo__block">
        <div className="promo__about">
          <h1 className="promo__title">Учебный проект студента факультета Веб-&zwj;разработки</h1>
          <p className="promo__text">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
          <a href="https://practicum.yandex.ru/web/"
            className="promo__link"
            target="_blank"
            rel="noreferrer"
          >
            Узнать больше
          </a>
        </div>
        <img src={landingLogo} alt="Земной шар, материки которого собраны из слова WEB" className="promo__logo" />
      </div>
    </section>
  );
}