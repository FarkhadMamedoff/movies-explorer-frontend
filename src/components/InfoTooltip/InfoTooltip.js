import './InfoTooltip.css';

export default function InfoTooltip(props) {
  return (
      <section className={`info-tooltip ${props.isOpen && 'info-tooltip_is-opened'}`}>
          <div className="info-tooltip__container">
              <div className="info-tooltip__message-container">
                  <div className={`info-tooltip__message ${props.isError && 'info-tooltip__message_type_failure'}`}></div>
                  <h2 className="info-tooltip__title">{props.isError ? 'Что-то пошло не так! Попробуйте еще раз.' : ''}</h2>
              </div>
              <button type="button" className="info-tooltip__button" onClick={props.onClose}></button>
          </div>
      </section>
  );
}