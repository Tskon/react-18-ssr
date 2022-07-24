import React from 'react'
import { useTranslation } from 'react-i18next'
import ContentBox from '@/common/components/ContentBox'
import ChangeEmailForm from '@/modules/auth/components/ChangeEmailForm'
import ChangePasswordForm from '@/modules/auth/components/ChangePasswordForm'
import styles from './Profile.scss'

const Profile = () => {
  const { t } = useTranslation()

  return (
    <div>
      <h1>
        {t('profile.title')}
      </h1>

      <ContentBox
        title={t('auth.changePassword.title')}
        className={styles.settingsBlock}
      >
        <ChangePasswordForm />
      </ContentBox>

      <ContentBox
        title={t('auth.changeEmail.title')}
        className={styles.settingsBlock}
      >
        <ChangeEmailForm />
      </ContentBox>
    </div>
  )
}

export default React.memo(Profile)
