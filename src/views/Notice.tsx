import styles from './Notice.module.css'
import { ReactComponent as ExclamationIcon } from '../icons/exclamation-circle-solid.svg'

const Notice = (props: { children: string }) => {
  const getErrorString = () => {
    try {
      return JSON.parse(props.children)
    } catch (error) {
      console.warn(error)
      return props.children
    }
  }

  return (
    <div className={styles.wrapper} role="alert">
      <div className={styles.icon}>
        <ExclamationIcon />
      </div>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{
          __html: getErrorString(),
        }}
      />
    </div>
  )
}

export default Notice
