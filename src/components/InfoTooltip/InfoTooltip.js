import './InfoTooltip.css';

export default function InfoTooltip({ isOpen, isError, messageText, onClose }) {
  return (
    <section className={`info-tooltip ${isOpen && 'info-tooltip_is-opened'}`}>
      <div className="info-tooltip__container">
        <div className="info-tooltip__message-container">
          <div className={`info-tooltip__message ${isError && 'info-tooltip__message_type_failure'}`}></div>
          <h2 className="info-tooltip__title">{messageText}</h2>
        </div>
        <button type="button" className="info-tooltip__button" onClick={onClose}></button>
      </div>
    </section>
  );
}