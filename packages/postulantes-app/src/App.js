import { Navigation } from 'react-native-navigation'
import moment from 'moment-timezone'
import { startSingleScreenApp } from './navigation/helpers'
import { registerScreens } from './navigation/registrer-screen'

import 'moment/min/locales'
import i18n from './i18n'

/**
 * REGISTRES SCREENS
 */
registerScreens()
/**
 * Start App
 */
Navigation.events().registerAppLaunchedListener(() => {
  startSingleScreenApp()
})

/**
 * Internationalization settings
 */

moment.tz.setDefault('UTC')
moment.locale(i18n.language)
moment.updateLocale('es', {
  relativeTime: {
    future: 'En %s',
    past: 'Hace %s',
    s: 'unos segundos',
    ss: '%d segundos',
    m: 'un minuto',
    mm: '%d minutos',
    h: 'una hora',
    hh: '%d horas',
    d: 'un día',
    dd: '%d días',
    M: 'un mes',
    MM: '%d meses',
    y: 'un año',
    yy: '%d años',
  },
})
