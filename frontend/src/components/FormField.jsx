import { useId } from 'react'

/** Campo con etiqueta, ícono, acción opcional a la derecha y mensaje de error debajo del input. */
export default function FormField({ label, icon: Icon, error, action, inputRef, ...inputProps }) {
  const id = useId()
  const errorId = `${id}-error`
  return (
    <div className="field">
      <label className="field__label" htmlFor={id}>{label}</label>
      <div className={`field__control${error ? ' field__control--error' : ''}`}>
        {Icon && <Icon size={19} className="field__icon" aria-hidden="true" />}
        <input
          id={id}
          ref={inputRef}
          className="field__input"
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          {...inputProps}
        />
        {action}
      </div>
      {error && <p id={errorId} className="field__error" role="alert">{error}</p>}
    </div>
  )
}
