import { ReactNode, ReactEventHandler, useRef, SyntheticEvent } from 'react'

import styles from './Input.module.css'

const Input = (props: {
  autoComplete?: string
  isRequired?: boolean
  label?: ReactNode
  minLength?: number
  onChange?: (value: string, event: SyntheticEvent) => void
  placeholder?: string
  type?: 'text' | 'email' | 'password'
  value?: string
}) => {
  const {
    autoComplete,
    isRequired,
    label,
    minLength,
    onChange,
    placeholder,
    type,
    value,
  } = props
  const inputEle = useRef<HTMLInputElement>(null)

  const handleChange: ReactEventHandler<HTMLInputElement> = (event) => {
    if (typeof onChange === 'function' && inputEle.current) {
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

Input.defaultProps = {
  autoComplete: 'on',
  type: 'text',
}

export default Input
