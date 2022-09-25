import React from 'react';
import { customNameMessage, customEmailMessage } from '../utils/constants';

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
    const input = e.target;
    const form = input.closest('form');

    if (input.validity.patternMismatch && input.name !== 'password') {
      if (input.name === 'name') {
        input.setCustomValidity(customNameMessage);
      } else if (input.name === 'email') {
        input.setCustomValidity(customEmailMessage);
      }
    } else {
      input.setCustomValidity('');
    }

    setErrors({
      ...errors,
      [input.name]: input.validationMessage,
    });
    setValues({
      ...values,
      [input.name]: input.value,
    });
    setIsValid(form.checkValidity());
  };

  const resetForm = React.useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, resetForm, isValid };
}