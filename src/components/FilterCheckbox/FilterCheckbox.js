import './FilterCheckbox.css';

export default function FilterCheckbox() {
  return (
    <label className="filter__label">
      <input className="filter__checkbox" type="checkbox" />
      <span className="filter__slider"></span>
      <p className="filter__text">Короткометражки</p>
    </label>
  );
}