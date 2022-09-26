import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './Profile.css';
import useFormValidation from '../../hooks/useFormValidation';
import { namePattern, emailPattern } from '../../utils/constants';

export default function Profile({ onSignOut, onUpdate }) {
  const currentUser = React.useContext(CurrentUserContext);
  const { values, handleChange, errors, resetForm, isValid } = useFormValidation();
  const isDataValid = isValid && (currentUser.name !== values.name || currentUser.email !== values.email);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdate({
      name: values.name,
      email: values.email
    });
  }

  React.useEffect(() => {
    resetForm(currentUser, {}, true);
  }, [currentUser, resetForm]);

  return (
    <section className="profile">
      <form className="profile-form" onSubmit={handleSubmit} noValidate>
        <h2 className="profile__title">{`Привет, ${currentUser.name || ''}!`}</h2>
        <div className="profile__input-container">
          <label className="profile__label">
            <p className="profile__caption">Имя</p>
            <input name="name"
              type="text"
              className="profile__input"
              required
              minLength="2"
              maxLength="30"
              value={values.name || ''}
              onChange={handleChange}
              pattern={namePattern} />
            <span className={`profile__input-error ${errors.name && 'profile__input-error_state_active'}`}>{errors.name || ''}</span>
          </label>
          <label className="profile__label">
            <p className="profile__caption">E-mail</p>
            <input name="email"
              type="email"
              className="profile__input"
              required
              minLength="2"
              maxLength="30"
              value={values.email || ''}
              onChange={handleChange}
              pattern={emailPattern} />
            <span className={`profile__input-error ${errors.email && 'profile__input-error_state_active'}`}>{errors.email || ''}</span>
          </label>
        </div>
        <button type="submit" className={`profile__button ${!isDataValid && 'profile__button_state_deactivated'}`} disabled={!isDataValid}>Редактировать</button>
        <button type="button" className="profile__button profile__button_type_signout" onClick={onSignOut}>Выйти из аккаунта</button>
      </form>
    </section>
  );
}