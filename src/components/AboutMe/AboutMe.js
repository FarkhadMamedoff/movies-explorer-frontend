import './AboutMe.css';
import NavCaption from '../NavCaption/NavCaption';
import image from '../../images/student_avatar.jpg';

export default function AboutMe() {
  return (
    <section className="about-me">
      <div className="about-me__block">
        <div className="about-me__nav-bar-container">
          <NavCaption title="Студент" />
        </div>
        <div className="about-me__info">
          <div className="about-me__bio">
            <h3 className="about-me__name">Фархад</h3>
            <p className="about-me__job">Фронтенд-разработчик, 30 лет</p>
            <p className="about-me__description">
              Я родился в городе Баку, сейчас живу в Королёве. Закончил факультет информатики и электроэнергетики МАИ.
              У меня есть жена и дочь. Люблю слушать музыку. Недавно начал заниматься веб-разработкой.
              Прошёл курс по веб-разработке и продолжаю свою работу с кодом.
            </p>
            <a href="https://github.com/FarkhadMamedoff" className="about-me__link" target="_blank" rel="noreferrer">Github</a>
          </div>
          <img src={image} alt="Аватар студента" className="about-me__avatar" />
        </div>
      </div>
    </section>
  );
}