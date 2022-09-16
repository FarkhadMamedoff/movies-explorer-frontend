import './Techs.css';
import NavCaption from '../NavCaption/NavCaption';

export default function Tech() {
  return (
    <section className="techs">
      <div className="techs__block">
        <div className="techs__nav-bar-container">
          <NavCaption title="Технологии" />
        </div>
        <h3 className="techs__text techs__text_type_title">7 технологий</h3>
        <p className="techs__text techs__text_type_subtitle">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        <ul className="techs__technologies">
          <li className="techs__technology">HTML</li>
          <li className="techs__technology">CSS</li>
          <li className="techs__technology">JS</li>
          <li className="techs__technology">React</li>
          <li className="techs__technology">Git</li>
          <li className="techs__technology">Express.js</li>
          <li className="techs__technology">mongoDB</li>
        </ul>
      </div>
    </section>
  );
}