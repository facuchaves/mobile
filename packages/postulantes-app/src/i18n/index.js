import i18n from 'i18next'
import { reactI18nextModule } from 'react-i18next'
import Config from 'react-native-config'
import es from './locales/lng/es_ES'
import cl from './locales/lng/es_CL'
import ec from './locales/lng/es_EC'
import pa from './locales/lng/es_PA'
// CLONAR POR QUE MODIFICA EL ORIGINAL

const resources = {
  es,
  cl,
  ec,
  pa,
}

i18n.use(reactI18nextModule).init({
  resources,
  lng: Config.PORTAL_LNG,
  keySeparator: '.',
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
})

export default i18n
