import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import Error from '../Error/Error';
import './AuthForm.css';
import { useLocation } from 'react-router-dom';
import useFormValidation from '../../hooks/useFormValidation';
import { namePattern, emailPattern } from '../../utils/constants';

export default function AuthForm({ onSubmit, isError, errorMessage }) {
  const location = useLocation();
  const isSignedIn = location.pathname === '/sign-in';
  const authFormText = isSignedIn ? 'Еще не зарегистрированы?' : 'Уже зарегистированы?';
  const tipText = !isSignedIn ? 'Войти' : 'Регистрация';
  const { values, handleChange, errors, resetForm, isValid } = useFormValidation();

  function handleSubmit(e) {
    e.preventDefault();
    const data = isSignedIn
      ? {
        password: values.password,
        email: values.email
      } : {
        name: values.name,
        password: values.password,
        email: values.email
      };
    onSubmit(data);
  }

  React.useEffect(() => {
    resetForm();
  }, [resetForm]);

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
              onChange={handleChange}
              pattern={namePattern} />
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
              onChange={handleChange}
              pattern={emailPattern} />
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
        <Error isError={isError} errorMessage={errorMessage} />
        <button type="submit" className={`auth-form__button ${!isValid && 'auth-form__button_state_deactivated'}`} disabled={!isValid}>{isSignedIn ? 'Войти' : 'Зарегистрироваться'}</button>
        <p className="auth-form__text">{authFormText} <Link to={isSignedIn ? "/sign-up" : "/sign-in"} className="auth-form__link">{tipText}</Link></p>
      </form>
    </section>
  );
}