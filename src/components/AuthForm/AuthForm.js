import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import './AuthForm.css';
import { useLocation } from 'react-router-dom';
import useFormValidation from '../../hooks/useFormValidation';

export default function AuthForm() {
  const location = useLocation();
  const isSignedIn = location.pathname === '/sign-in';
  const authFormText = isSignedIn ? 'Еще не зарегистрированы?' : 'Уже зарегистированы?';
  const tipText = isSignedIn ? 'Войти' : 'Регистрация';
  const {values, handleChange, errors, isValid} = useFormValidation();

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <section className="auth">
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <Link to="/">
          <Logo />
        </Link>
        <h2 className="auth-form__title">{isSignedIn ? 'Рады видеть!' : 'Добро пожаловать!'}</h2>
        <div className={`auth-form__input-container  ${isSignedIn && 'auth-form__input-container_type_login'}`}>
          {!isSignedIn && <label className="auth-form__label">
            <p className="auth-form__caption">Имя</p>
            <input name="name"
              type="text"
              className={`auth-form__input ${errors.name && 'auth-form__input_mode_error'}`}
              required
              minLength="2"
              maxLength="30"
              value={values.name || ''}
              onChange={handleChange} />
            <span className={`auth-form__input-error ${errors.name && 'auth-form__input-error_state_active'}`}>{errors.name || ''}</span>
          </label>}
          <label className="auth-form__label">
            <p className="auth-form__caption">E-mail</p>
            <input name="email"
              type="email"
              className={`auth-form__input ${errors.email && 'auth-form__input_mode_error'}`}
              required
              minLength="2"
              maxLength="30"
              value={values.email || ''}
              onChange={handleChange} />
            <span className={`auth-form__input-error ${errors.email && 'auth-form__input-error_state_active'}`}>{errors.email || ''}</span>
          </label>
          <label className="auth-form__label">
            <p className="auth-form__caption">Пароль</p>
            <input name="password"
              type="password"
              className={`auth-form__input ${errors.password && 'auth-form__input_mode_error'}`}
              required
              minLength="8"
              maxLength="30"
              value={values.password || ''}
              onChange={handleChange} />
            <span className={`auth-form__input-error ${errors.password && 'auth-form__input-error_state_active'}`}>{errors.password || ''}</span>
          </label>
        </div>
        <button type="submit" className={`auth-form__button ${!isValid && 'auth-form__button_state_deactivated'}`} disabled={!isValid}>{isSignedIn ? 'Войти' : 'Зарегистрироваться'}</button>
        <p className="auth-form__text">{authFormText} <Link to={isSignedIn ? "/sign-up" : "/sign-in"} className="auth-form__link">{tipText}</Link></p>
      </form>
    </section>
  );
}