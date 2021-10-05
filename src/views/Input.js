import { useRef } from 'react' // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'

import styles from './Input.module.css'

const Input = ({ isRequired, label, onChange, placeholder, value }) => {
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
        className={styles.input}
        onChange={handleChange}
        placeholder={placeholder}
        ref={inputEle}
        required={isRequired}
        value={value}
      />
    </label>
  )
}

Input.propTypes = {
  isRequired: PropTypes.bool,
  label: PropTypes.node,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
}

export default Input
