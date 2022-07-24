import React, { useEffect, lazy } from 'react'
import { Outlet } from 'react-router-dom'
// import { breakpoints, routes } from '@/common/constants'
// import throttle from '@/common/helpers/throttle'
// import { setDeviceWidth } from '@/common/stores/device'
// import { getSelfData } from '@/modules/auth/api'
// import { setUser } from '@/modules/auth/store'
// import { useAppDispatch, useAppSelector } from '@/services/store'
import styles from './DefaultLayout.scss'

const MobileHeader = lazy(() => import('./components/MobileHeader'))
const Sidebar = lazy(() => import('./components/Sidebar'))

interface DefaultLayoutProps {
  children?: React.ReactNode
}

const DefaultLayout = (props: DefaultLayoutProps) => {
  const isMobileWidth: boolean|null = false // TODO fix that
  // const isMobileWidth = useAppSelector(({ device }) => {
  //   return device.width ? device.width < breakpoints.SM : null
  // })

  useEffect(() => {
    // dispatch(setDeviceWidth(window.innerWidth))
    // const throttledResizeHandler = throttle(() => {
    //   dispatch(setDeviceWidth(window.innerWidth))
    // }, 100)
    // window.addEventListener('resize', throttledResizeHandler)
    // return () => {
    //   window.removeEventListener('resize', throttledResizeHandler)
    // }
  }, [])

  return (isMobileWidth === null) ? null : (
    <div
      className={styles.body}
    >
      <div className={styles.wrapper}>
        { isMobileWidth
              ? <MobileHeader /> : <Sidebar className={styles.sidebar} />
            }
        <div className={styles.content}>
          { props.children || <Outlet /> }
        </div>
      </div>
    </div>
  )
}

export default React.memo(DefaultLayout)
