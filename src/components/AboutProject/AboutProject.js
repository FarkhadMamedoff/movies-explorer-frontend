import './AboutProject.css';
import NavCaption from '../NavCaption/NavCaption';

export default function AboutProject() {
  return (
    <section className="about-project">
      <div className="about-project__block">
        <div className="about-project__nav-bar-container">
          <NavCaption title="О проекте" />
        </div>
        <ul className="about-project__info">
          <li className="about-project__info-item">
            <h3 className="about-project__info-title">Дипломный проект включал 5 этапов</h3>
            <p className="about-project__info-text">
              Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
            </p>
          </li>
          <li className="about-project__info-item">
            <h3 className="about-project__info-title">На выполнение диплома ушло 5 недель</h3>
            <p className="about-project__info-text">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
            </p>
          </li>
        </ul>
        <div className="about-project__timeline">
          <div className="about-project__timeline-block about-project__timeline-block_type_backend">
            <span className="about-project__timeline-info about-project__timeline-info_type_backend">1 неделя</span>
            <p className="about-project__timeline-caption">Back-end</p>
          </div>
          <div className="about-project__timeline-block">
            <span className="about-project__timeline-info about-project__timeline-info_type_frontend">4 недели</span>
            <p className="about-project__timeline-caption">Front-end</p>
          </div>
        </div>
      </div>
    </section>
  );
}