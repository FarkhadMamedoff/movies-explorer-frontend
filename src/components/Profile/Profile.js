import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';

export default function Profile() {

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <section className="profile">
      <form className="profile-form" onSubmit={handleSubmit} noValidate>
        <h2 className="profile__title">Привет, Фархад!</h2>
        <div className="profile__input-container">
          <label className="profile__label">
            <p className="profile__caption">Имя</p>
            <input name="name"
              type="text"
              className="profile__input"
              required
              value={'Фархад'}
              minLength="2"
              maxLength="30"
              disabled/>
          </label>
          <label className="profile__label">
            <p className="profile__caption">E-mail</p>
            <input name="email"
              type="email"
              className="profile__input"
              required
              value={'adareem@gmail.com'}
              minLength="2"
              maxLength="30"
              disabled />
          </label>
        </div>
        <button type="submit" className="profile__button">Редактировать</button>
        <Link to="/" className="profile__button profile__button_type_signout">Выйти из аккаунта</Link>
      </form>
    </section>
  );
}