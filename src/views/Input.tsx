import { FC, ReactNode, ReactEventHandler, useRef, SyntheticEvent } from 'react' // eslint-disable-line no-unused-vars

import styles from './Input.module.css'

type Type = 'text' | 'email' | 'password'

interface InputProps {
  autoComplete?: string
  isRequired?: boolean
  label?: ReactNode
  minLength?: number
  onChange?: (value: string, event: SyntheticEvent) => void
  placeholder?: string
  type?: Type
  value?: string
}

const Input: FC<InputProps> = ({
  autoComplete,
  isRequired,
  label,
  minLength,
  onChange,
  placeholder,
  type,
  value,
}) => {
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
