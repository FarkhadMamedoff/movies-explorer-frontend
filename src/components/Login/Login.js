import React from 'react';
import AuthForm from '../AuthForm/AuthForm';

export default function Login({ onLogin, isLogError, errorMessage }) {
  const [isError, setIsError] = React.useState(false);

  React.useEffect(() => {
    setIsError(isLogError);
  }, [isLogError]);

  return (
    <AuthForm onSubmit={onLogin} isError={isError} errorMessage={errorMessage} />
  )
}