/* eslint-disable global-require */
/* eslint-disable import/prefer-default-export */
import { Navigation } from 'react-native-navigation'
import NetInfo from '@react-native-community/netinfo'
import ScreenIds from '../constants/ScreenIds'
import DefaultTheme from '../themes/DefaultTheme'
import i18n from '../i18n'

let currentScreen
let currentTabIndex
let prevTabIndex

export function setCurrentScreen(screen) {
  currentScreen = screen
}

export function getCurrentScreen() {
  return currentScreen
}

export const showOverlay = (screenId, passProps = {}, interceptTouchOutside = false) => {
  const backgroundColor = 'white'

  Navigation.showOverlay({
    component: {
      name: screenId,
      passProps,
      options: {
        overlay: {
          interceptTouchOutside,
        },
        layout: {
          backgroundColor,
        },
      },
    },
  })
}

export function dismissOverlay(componentId) {
  return Navigation.dismissOverlay(componentId)
}

export function getCurrentTabIndex() {
  return currentTabIndex
}

export function setCurrentTabIndex(tabIndex) {
  currentTabIndex = tabIndex
}

export function setPrevTabIndex(tabIndex) {
  prevTabIndex = tabIndex
}

export function getPrevTabIndex() {
  return prevTabIndex
}

export function pushScreen(componentId, screenName, passProps) {
  Navigation.push(componentId, {
    component: {
      name: screenName,
      passProps,
    },
  })
}

export const showModal = async (nameScreen, passProps) => {
  const connection = await NetInfo.fetch()
  const nameModal = connection.isInternetReachable ? nameScreen : ScreenIds.BOOT_ERROR

  Navigation.showModal({
    stack: {
      children: [
        {
          component: {
            name: ScreenIds[nameModal],
            passProps,
            options: {
              animations: {
                setStackRoot: {
                  enabled: true,
                },
              },
              topBar: {
                drawBehind: true,
                visible: false,
                animate: false,
              },
              layout: {
                orientation: ['portrait'],
              },
            },
          },
        },
      ],
    },
  })
}
export const changeBadge = totalUnread => {
  let badgeValue = ''
  if (totalUnread > 0) {
    badgeValue = totalUnread > 10 ? '10+' : `${totalUnread}`
  }

  Navigation.mergeOptions('Mensajes', {
    bottomTab: {
      badge: badgeValue,
    },
  })
}

export const dismissModal = componentId => {
  Navigation.dismissModal(componentId)
}

export const startSingleScreenApp = (initialScreen = ScreenIds.ONBOARDING) => {
  Navigation.setRoot({
    root: {
      component: {
        name: initialScreen,

        options: {
          layout: {
            orientation: ['portrait'],
          },
        },
      },
    },
  })
}

export const setDefaultNavigationOptions = theme => {
  Navigation.setDefaultOptions({
    layout: {
      orientation: ['portrait'],
      backgroundColor: theme.colors.background,
    },
  })
}

const getTabTintOptions = (theme, screen, text, icon, applyTint) => {
  if (applyTint) {
    if (ScreenIds.MENSAJES === screen) {
      return {
        id: text,
        text,
        iconColor: theme.colors.bottomTabDisabled,
        selectedIconColor: theme.colors.accent,
        textColor: theme.colors.bottomTabDisabled,
        selectedTextColor: theme.colors.accent,
        fontFamily: 'Helvetica',
        selectedFontSize: 14,
        fontSize: 14,
        icon,
        // badge: numberMenssage,
        badgeColor: 'red',
        titleDisplayMode: 'alwaysHide',
      }
    }
    return {
      id: text,
      text,
      iconColor: theme.colors.bottomTabDisabled,
      selectedIconColor: theme.colors.accent,
      textColor: theme.colors.bottomTabDisabled,
      selectedTextColor: theme.colors.accent,
      fontFamily: 'Helvetica',
      selectedFontSize: 14,
      fontSize: 14,
      icon,
      titleDisplayMode: '',
    }
  }

  return { icon }
}

const getBottomTab = (theme, screen, text, icon, applyTint = true) => {
  return {
    stack: {
      id: text,
      children: [
        {
          component: {
            name: screen,
            passProps: {
              text,
            },
            options: {
              bottomTab: getTabTintOptions(theme, screen, text, icon, applyTint),
              topBar: {
                drawBehind: true,
                visible: false,
                animate: false,
              },
              layout: {
                orientation: ['portrait'],
              },
              bottomTabs: {
                titleDisplayMode: 'alwaysShow',
                backgroundColor: theme.colors.primary,
                animate: false,
                visible: true,
                hideShadow: true,
                elevation: 10,
              },
            },
          },
        },
      ],
    },
  }
}

export const startLoginTabBasedApp = theme => {
  Navigation.setRoot({
    root: {
      bottomTabs: {
        id: 'bottom-tabs',
        children: [
          getBottomTab(theme, ScreenIds.HOME, i18n.t('tabs:home'), require('../images/icn_search.png')),
          getBottomTab(
            theme,
            ScreenIds.MIS_POSTULACIONES,
            i18n.t('tabs:mis_postulaciones'),
            require('../images/icn_post.png')
          ),
          getBottomTab(theme, ScreenIds.CURRICULUM, i18n.t('tabs:curriculum'), require('../images/icn_cv.png')),
          getBottomTab(theme, ScreenIds.MENSAJES, i18n.t('tabs:mensajes'), require('../images/icn_chat.png')),
        ],
        options: {
          bottomTabs: {
            animate: true,
            visible: true,
            hideShadow: true,
            titleDisplayMode: 'alwaysHide',
            currentTabIndex: 0,
            backgroundColor: DefaultTheme.colors.primary,
            elevation: 10,
          },
          bottomTab: {},
        },
      },
    },
  })
}

export const startTabBasedApp = () => {
  Navigation.setRoot({
    root: {
      component: {
        name: ScreenIds.PRE_LOGIN,
      },
    },
  })
}
