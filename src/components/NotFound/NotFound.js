import './NotFound.css';

export default function NotFound({ returntoPrevious }) {
  return (
    <main className="not-found">
      <div className="not-found__error-block">
        <p className="not-found__error">404</p>
        <p className="not-found__error-description">Страница не найдена</p>
      </div>
      <button className="not-found__button" onClick={returntoPrevious}>Назад</button>
    </main>
  );
}
