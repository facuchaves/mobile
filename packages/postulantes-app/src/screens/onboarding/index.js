/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import React, { useRef, useEffect, useState } from 'react'
import { ActivityIndicator, View, Animated, Dimensions, StyleSheet } from 'react-native'
import { isEmpty } from 'lodash'
import Config from 'react-native-config'
import {
  setDefaultNavigationOptions,
  startTabBasedApp,
  startLoginTabBasedApp,
  changeBadge,
  showModal,
} from '../../navigation/helpers'
import ScreenIds from '../../constants/ScreenIds'
import { vw, vh, WINDOW_WIDTH } from '../../style/helpers'
import { useBoot } from '../../hooks/splash/index'
import DefaultTheme from '../../themes/DefaultTheme'
import CuentaServices from '../../api/cuenta-service'
import { User } from '../../api/session-service'
import COUNTRY_INFO from '../../constants/CountryInfo'
import CountrySelection from './components/country-selection'
import i18n from '../../i18n'
/*
 * Constants
 */
const theme = DefaultTheme
export const SCROLL_STEP_HEIGHT = Dimensions.get('window').height
const logos = {
  bumeran: require('../../images/Bumeran.png'),
  laborum: require('../../images/Laborum.png'),
  konzerta: require('../../images/Konzerta.png'),
  multitrabajos: require('../../images/Multitrabajos.png'),
}
/*
 * Styles
 */

const styles = StyleSheet.create({
  containerScroll: {
    padding: 0,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  splash: {
    height: SCROLL_STEP_HEIGHT,
    width: WINDOW_WIDTH,
    backgroundColor: theme.colors.surface,
  },
  logoCountryContainer: {
    height: SCROLL_STEP_HEIGHT,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  logoContainer: {
    zIndex: 999,
    position: 'absolute',
    top: (SCROLL_STEP_HEIGHT - vw(61)) / 2,
  },
  logoContainerCountry: {
    zIndex: 999,
    position: 'absolute',
    top: (SCROLL_STEP_HEIGHT - vw(61)) / 4,
  },
  logo: {
    width: vw(240),
    height: vw(61),
  },
  loader: {
    marginTop: vh(50),
  },
})

/**
 * Helpers
 */

// eslint-disable-next-line no-unused-vars
const showErrorLayer = () => {
  showModal(ScreenIds.BOOT_ERROR, { restart: true })
}

/*
 * OnboardingScreen
 */

const OnboardingScreen = () => {
  const scrollRef = useRef()
  const [isLoading, setIsLoading] = useState(true)
  const [country, setCountry] = useState(false)

  const { isReady, hasError } = useBoot()

  // Seteamos country para definir como resolver el omboarding
  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    GetinfoCountry()
  }, [])

  useEffect(() => {
    if (hasError) {
      // eslint-disable-next-line no-console
      showErrorLayer()
    }
  }, [hasError])

  useEffect(() => {
    if (isReady) {
      setIsLoading(false)
    }
  }, [isReady])

  useEffect(() => {
    const initApp = async () => {
      const isLoggedIn = await User.checkLogin()
      if (isReady && !hasError && country) {
        setIsLoading(false)
        setDefaultNavigationOptions(theme)
        if (isLoggedIn) {
          await startLoginTabBasedApp(theme)
          const countBadge = await CuentaServices.getUnreadMessagesCount()
          await changeBadge(countBadge)
        } else {
          await startTabBasedApp(theme)
        }
      }
    }
    initApp()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasError, isReady, country])

  const scrollAnimatedValue = useRef(new Animated.Value(0)).current
  const logoAnimationStyle = {
    transform: [
      {
        translateY: scrollAnimatedValue.interpolate({
          inputRange: [0, SCROLL_STEP_HEIGHT],
          outputRange: [0, SCROLL_STEP_HEIGHT / 2 + vw(120)],
        }),
      },
    ],
  }

  const GetinfoCountry = async () => {
    const dataStore = await CuentaServices.getCountrySelection()

    if (!isEmpty(dataStore)) {
      setCountry(true)
      // cambio el lng de i81n
      i18n.changeLanguage(dataStore.lng)
      return false
    }

    // eslint-disable-next-line no-unused-expressions
    Config.PORTAL === 'bumeran' ? setCountry(false) : setCountry(true)

    return false
  }

  const handleCountrySelect = async countryInfo => {
    setIsLoading(true)
    await CuentaServices.setCountrySelection(countryInfo)
    // cambio el lng de i81n
    i18n.changeLanguage(countryInfo.lng)
    setCountry(true)
  }

  const selectCountryAvaliable = Config.PORTAL === 'bumeran' && !country
  return (
    <Animated.ScrollView
      ref={scrollRef}
      contentContainerStyle={styles.containerScroll}
      pagingEnabled
      bounces={false}
      scrollEnabled={false}
      scrollEventThrottle={1}
      showsVerticalScrollIndicator={false}
      onScroll={Animated.event(
        [
          {
            nativeEvent: {
              contentOffset: { y: scrollAnimatedValue },
            },
          },
        ],
        { useNativeDriver: true }
      )}
    >
      {isLoading ? (
        <>
          <View style={styles.logoContainer}>
            <Animated.Image
              resizeMode="contain"
              style={[styles.logo, logoAnimationStyle]}
              source={logos[Config.PORTAL]}
            />
            <ActivityIndicator color={theme.colors.primary} size="small" style={styles.loader} />
          </View>
          <View style={styles.splash} />
        </>
      ) : (
        selectCountryAvaliable && (
          <View style={[styles.logoCountryContainer]}>
            <View style={styles.logoContainerCountry}>
              <Animated.Image resizeMode="contain" style={[styles.logo]} source={logos[Config.PORTAL]} />
            </View>

            <CountrySelection data={COUNTRY_INFO} onCountrySelect={handleCountrySelect} />
          </View>
        )
      )}
    </Animated.ScrollView>
  )
}

/*
 * Navigation
 */

OnboardingScreen.options = {
  topBar: {
    visible: false,
    drawBehind: true,
    height: 0,
  },
  bottomTabs: {
    drawBehind: true,
    visible: false,
  },
}

/*
 * Exports
 */

export default OnboardingScreen
