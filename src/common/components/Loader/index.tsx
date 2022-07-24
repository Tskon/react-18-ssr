import React, { CSSProperties } from 'react'
import styles from './Loader.scss'

interface LoaderProps {
  size: string
}

type StyleWithCustomProperties = CSSProperties & {[key: string]: string}

const Loader = (props: LoaderProps) => {

  return (
    <div
      className={styles.wrapper}
      style={{ '--size': props.size } as StyleWithCustomProperties}
    >
      <div className={styles.loader} />
    </div>
  )
}

export default React.memo(Loader)
