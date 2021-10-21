import styles from './Notice.module.css'
import { ReactComponent as ExclamationIcon } from '../icons/exclamation-circle-solid.svg'

const Notice = (props: { children: string }) => {
  return (
    <div className={styles.wrapper} role="alert">
      <div className={styles.icon}>
        <ExclamationIcon />
      </div>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: JSON.parse(props.children) }}
      />
    </div>
  )
}

export default Notice
