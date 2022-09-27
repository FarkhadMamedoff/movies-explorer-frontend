import './Error.css'

export default function Error({ isError, errorMessage }) {
  return (
    <p className={`error ${isError && 'error_is-active'}`}>{errorMessage}</p>
  )
};