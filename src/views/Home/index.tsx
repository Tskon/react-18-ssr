import React from 'react'
import { useTranslation } from 'react-i18next'

const Home = () => {
  const { t } = useTranslation()

  return (
    <div>
      <h1>
        {t('myPromos.title')}
      </h1>
    </div>
  )
}

export default React.memo(Home)
