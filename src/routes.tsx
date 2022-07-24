import React, { lazy } from 'react'
import { Routes, Route, Navigate, useMatch, Outlet } from 'react-router-dom'
import { routes } from '@/common/constants'
import DefaultLayout from '@/layouts/Default'
import EmptyLayout from '@/layouts/Empty'

const Home = lazy(() => import('@/views/Home'))
const Profile = lazy(() => import('@/views/Profile'))

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const EmptyParent = (params: {
  path: string
  redirectPath: string
}) => {
  const isMatch = useMatch(params.path)

  return isMatch ? <Navigate to={params.redirectPath} /> : <Outlet />
}

function AppRoutes() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route
          index
          element={<Home />}
        />
        <Route
          path={routes.PROFILE}
          element={<Profile />}
        />
      </Route>

      <Route element={<EmptyLayout />}>
        <Route
          path="*"
          element={(
            <h2>
              404
            </h2>
          )}
        />
      </Route>
    </Routes>
  )
}

export default AppRoutes
