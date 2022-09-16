import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

export default function SeachForm() {
  return (
    <form className="search-form" name="search" noValidate>
      <div className="search-form__block">
        <input id="searchInput" type="text" placeholder="Фильм" className="search-form__input" autoComplete="off" />
        <button className="search-form__button" type="submit"></button>
      </div>
      <FilterCheckbox />
    </form>
  );
}