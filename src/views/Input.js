import { useRef } from 'react' // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'

import styles from './Input.module.css'

const Input = ({
  autoComplete,
  isRequired,
  label,
  minLength,
  onChange,
  placeholder,
  type,
  value,
}) => {
  const inputEle = useRef()

  const handleChange = event => {
    if (typeof onChange === 'function') {
      onChange(inputEle.current.value, event)
    }
  }

  return (
    <label className={styles.wrapper}>
      <div className="text--s text--bold">{label}</div>
      <input
        autoComplete={autoComplete}
        className={styles.input}
        minLength={minLength}
        onChange={handleChange}
        placeholder={placeholder}
        ref={inputEle}
        required={isRequired}
        type={type}
        value={value}
      />
    </label>
  )
}

Input.propTypes = {
  autoComplete: PropTypes.string,
  isRequired: PropTypes.bool,
  label: PropTypes.node,
  minLength: PropTypes.number,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.oneOf(['text', 'email', 'password']),
  value: PropTypes.string,
}

Input.defaultProps = {
  autocomplete: 'on',
  type: 'text',
}

export default Input
