import React, { ChangeEvent, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useValidation } from '@/services/validation'
import styles from './ChangeEmailForm.scss'

const ChangeEmailForm = () => {
  const { t } = useTranslation()
  const v = useValidation({
    newEmail: [ 'email' ],
  })

  const [ newEmail, setNewEmail ] = useState('')

  const inputHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    v.validate('newEmail', e.target.value)
    setNewEmail(e.target.value)
  }, [])

  const onSubmit = useCallback(async(e: React.FormEvent) => {
    e.preventDefault()
  }, [ newEmail ])

  return (
    <form onSubmit={onSubmit}>
      <label>
        {t('auth.changeEmail.inputLabel')}
        <input
          className={styles.input}
          placeholder={t('auth.changeEmail.inputPlaceholder')}
          name="newEmail"
          onChange={inputHandler}
        />
      </label>

      <button
        type="submit"
        disabled={!v.isValid()}
      >
        {t('auth.changePassword.submitButton')}
      </button>
    </form>
  )
}

export default React.memo(ChangeEmailForm)
