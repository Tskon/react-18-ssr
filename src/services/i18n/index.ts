import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import ru from './ru'

const resources = {
  ru: { translation: ru },
}

i18next
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ru',
    lng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18next
export const { changeLanguage } = i18next
