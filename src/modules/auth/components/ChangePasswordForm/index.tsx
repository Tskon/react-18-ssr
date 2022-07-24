import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useValidation } from '@/services/validation'
import styles from './ChangePasswordForm.scss'

const getInitForm = () => ({
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
})

const ChangePasswordForm = () => {
  const { t } = useTranslation()
  const v = useValidation({
    oldPassword: [ 'required' ],
    newPassword: [ 'password' ],
    confirmPassword: [ 'required' ],
  })

  const [ form, setForm ] = useState(getInitForm())
  const inputHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    v.validate(e.target.name, e.target.value)
    setForm(state => ({
      ...state,
      [ e.target.name ]: e.target.value,
    }))
  }, [])

  const onSubmit = useCallback(async(e: FormEvent) => {
    e.preventDefault()
  }, [ form.newPassword, form.oldPassword ])

  return (
    <form onSubmit={onSubmit}>
      <label>
        {t('auth.changePassword.oldPasswordLabel')}
        <input
          className={styles.input}
          placeholder={t('auth.changePassword.oldPasswordPlaceholder')}
          name="oldPassword"
          value={form.oldPassword}
          onChange={inputHandler}
        />
      </label>

      <label>
        {t('auth.changePassword.newPasswordLabel')}
        <input
          className={styles.input}
          placeholder={t('auth.changePassword.newPasswordPlaceholder')}
          name="newPassword"
          value={form.newPassword}
          onChange={inputHandler}
        />
      </label>

      <label>
        {t('auth.changePassword.confirmPasswordLabel')}
        <input
          className={styles.input}
          placeholder={t('auth.changePassword.confirmPasswordPlaceholder')}
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={inputHandler}
        />
      </label>

      <button
        type="submit"
        disabled={!v.isValid() || form.newPassword !== form.confirmPassword}
      >
        {t('auth.changePassword.submitButton')}
      </button>
    </form>
  )
}

export default React.memo(ChangePasswordForm)
