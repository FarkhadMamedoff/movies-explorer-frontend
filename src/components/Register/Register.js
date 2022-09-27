import React from 'react';
import AuthForm from '../AuthForm/AuthForm';

export default function Register({ onRegister, isRegError, errorMessage }) {
  const [isError, setIsError] = React.useState(false);

  React.useEffect(() => {
    setIsError(isRegError);
  }, [isRegError]);

  return (
    <AuthForm onSubmit={onRegister} isError={isError} errorMessage={errorMessage} />
  )
}