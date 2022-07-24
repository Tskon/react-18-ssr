import React from 'react'
import classNames from 'classnames'
import styles from './ContentBox.scss'

interface ContentBoxProps {
  className?: string
  title?: string
  children?: React.ReactNode
}

const ContentBox = (props: ContentBoxProps) => {
  return (
    <div className={classNames([ styles.wrapper, props.className ])}>
      {props.title && (
        <div className={styles.title}>
          {props.title}
        </div>
      )}
      {props.children}
    </div>
  )
}

export default React.memo(ContentBox)
