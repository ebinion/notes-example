import { SpinnerIcon } from '../icons'
import styles from './Spinner.module.css'

const Spinner = () => {
  return (
    <div className={styles.wrapper}>
      <SpinnerIcon className={styles.icon} />
    </div>
  )
}

export default Spinner
