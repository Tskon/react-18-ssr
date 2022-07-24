import React, { useCallback, useEffect, useState } from 'react'
import classNames from 'classnames'
import { Link, useLocation } from 'react-router-dom'
import CloseIcon from '@/assets/icons/close.svg'
import MenuIcon from '@/assets/icons/menu.svg'
import Logo from '@/assets/images/common/logo.svg'
import { routes } from '@/common/constants'
import Nav from '../Nav'
import styles from './MobileHeader.scss'

type HeaderPropType = {
  className?: string
}

const MobileHeader = (props: HeaderPropType) => {
  const location = useLocation()
  const [ menuOpened, setMenuOpen ] = useState(false)
  const toggleMenu = useCallback(() => {
    setMenuOpen(state => !state)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [ location.pathname ])

  return (
    <div>
      <header className={classNames(styles.header, props.className)}>
        <button
          className={styles.menuButton}
          onClick={toggleMenu}
        >
          {
            menuOpened
              ? <CloseIcon className={styles.menuIcon} />
              : <MenuIcon className={styles.menuIcon} />
          }
        </button>

        <Link
          className={styles.logoWrapper}
          to={routes.HOME}
        >
          <Logo className={styles.logo} />
        </Link>
      </header>

      {menuOpened && (
        <div
          className={styles.menuWrapper}
        >
          <Nav className={styles.menu} />
        </div>
      )}
    </div>
  )
}

export default React.memo(MobileHeader)
