import React from 'react'
import { Outlet } from 'react-router-dom'
import styles from './Empty.scss'

interface EmptyLayoutProps {
  children?: React.ReactNode
  withoutLoadData?: boolean
}

const EmptyLayout = (props: EmptyLayoutProps) => {
  return (
    <div className={styles.wrapper}>
      { props.children || <Outlet /> }
    </div>
  )
}

export default React.memo(EmptyLayout)
