import React from 'react';
import './FilterCheckbox.css';

export default function FilterCheckbox({ isSearch, onSearchShortFilms }) {
  const checkedRef = React.useRef();

  const handleOnClick = () => {
    onSearchShortFilms(isSearch);
  }

  React.useEffect(() => {
    checkedRef.current.checked = isSearch;
  }, [isSearch]);

  return (
    <label className="filter__label">
      <input className="filter__checkbox" ref={checkedRef} type="checkbox" onClick={handleOnClick} />
      <span className="filter__slider"></span>
      <p className="filter__text">Короткометражки</p>
    </label>
  );
}