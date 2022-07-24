import React from 'react'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { Link, useMatch } from 'react-router-dom'
import User from '@/assets/icons/user.svg'
import { routes } from '@/common/constants'
import styles from './Nav.scss'

interface NavProps {
  className?: string
}

const Nav = (props: NavProps) => {
  const { t } = useTranslation()

  const getStylesForRoute = (routePath: string): string => classNames(
    styles.link,
    { [ styles.linkActive ]: useMatch(routePath) },
  )

  return (
    <div className={classNames([ props.className, styles.wrapper ])}>
      <div>
        <div className={styles.header}>
          <Link
            className={styles.headerLink}
            to={routes.PROFILE}
          >
            <User className={styles.headerIcon} />
            {t('nav.profile')}
          </Link>
        </div>

        <nav className={styles.nav}>
          <Link
            to="/"
            className={getStylesForRoute('/')}
          >
            <User className={styles.icon} />
            {t('nav.home')}
          </Link>
        </nav>
      </div>
    </div>
  )
}

export default Nav
