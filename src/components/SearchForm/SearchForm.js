import './SearchForm.css';
import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

export default function SeachForm({ isSearch, onSearchShortFilms, onSearch, defaultQuery }) {
  const [placeholderText, setPlaceholderText] = React.useState('Фильм');
  const searchRef = React.useRef();

  React.useEffect(() => {
    searchRef.current.value = defaultQuery;
  }, [defaultQuery]);

  function handleSubmit(e) {
    e.preventDefault();
    if (searchRef.current.value === '') {
      setPlaceholderText('Нужно ввести ключевое слово');
    } else {
      onSearch(searchRef.current.value);
    }
  }

  return (
    <form className="search-form" name="search" onSubmit={handleSubmit} noValidate>
      <div className="search-form__block">
        <input name="search" ref={searchRef} type="text" placeholder={placeholderText} className="search-form__input" autoComplete="off" required />
        <button className="search-form__button" type="submit"></button>
      </div>
      <FilterCheckbox isSearch={isSearch} onSearchShortFilms={onSearchShortFilms} />
    </form>
  );
}