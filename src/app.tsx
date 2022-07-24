import React, { Suspense } from 'react'
import { Provider } from 'react-redux'
import Loader from '@/common/components/Loader'
import EmptyLayout from '@/layouts/Empty'
import Routes from '@/routes'
import store from '@/services/store'
import '@/services/i18n'
import '@/common/scss/styles.global.scss'

const App = () => (
  <React.StrictMode>
    <Provider store={store}>
      <Suspense fallback={(
        <EmptyLayout withoutLoadData>
          <Loader size="100px" />
        </EmptyLayout>
      )}
      >
        <Routes />
      </Suspense>
    </Provider>
  </React.StrictMode>
)

export default App
