import React from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import Logo from '@/assets/images/common/logo.svg'
import { routes } from '@/common/constants'
import Nav from '@/layouts/Default/components/Nav'
import styles from './Sidebar.scss'

type SidebarPropType = {
  className?: string
}

const Sidebar = (props: SidebarPropType) => {
  return (
    <div className={classNames([ styles.sidebar, props.className ])}>
      <Link
        className={styles.logoWrapper}
        to={routes.HOME}
      >
        <Logo className={styles.logo} />
      </Link>

      <Nav className={styles.nav} />
    </div>
  )
}

export default Sidebar
