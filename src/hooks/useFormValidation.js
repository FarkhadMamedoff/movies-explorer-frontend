import React from 'react';

export default function useFormValidation() {
  const baseObject = {
    name: '',
    email: '',
    password: ''
  };
  const [values, setValues] = React.useState(baseObject);
  const [errors, setErrors] = React.useState(baseObject);
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (e) => {
    setValues(baseObject);
    setErrors(baseObject);
    setIsValid(false);
    const input = e.target;
    const form = input.closest('form');
    const nextValuesState = {
      ...values,
      [input.name]: input.value,
    };
    if (input.validationMessage !== '') {
      const nextErrorsState = {
        ...errors,
        [input.name]: input.validationMessage,
      };
      setErrors(nextErrorsState);
    }
    setValues(nextValuesState);
    setIsValid(form.checkValidity());
  };

  return { values, handleChange, errors, isValid };
}