/* eslint-disable global-require */
// IMPORTS
import React, { useState } from 'react'
import { StyleSheet, Image, Dimensions } from 'react-native'
import { useNavigationComponentDidAppear } from 'react-native-navigation-hooks'
import Config from 'react-native-config'
import { Container, Text } from 'native-base'
import DefaultTheme from '../../themes/DefaultTheme'
import ScreenIds from '../../constants/ScreenIds'
import i18n from '../../i18n'
import { showModal } from '../../navigation/helpers'
import { BusquedasRecientes } from '../../shared/utils/filtrosUtils'

// COMPONENTS
import BusquedasRecientesList from './components/BusquedasRecientesList'

// UI-KIT
import { ButtonUi, Loading } from '../../shared/ui-kit'

const logos = {
  bumeran: require('../../images/Bumeran.png'),
  laborum: require('../../images/Laborum.png'),
  konzerta: require('../../images/Konzerta.png'),
  multitrabajos: require('../../images/Multitrabajos.png'),
}
const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: DefaultTheme.colors.background,
    textAlign: 'center',
    marginTop: -100,
  },
  image: {
    alignSelf: 'center',
    width: width / 1.5,
    height: 55,
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
    margin: 15,
    lineHeight: 32,
    color: DefaultTheme.colors.primaryText,
  },
  containerInput: {
    fontSize: 20,
    marginHorizontal: 16,
    backgroundColor: DefaultTheme.colors.white,
    width: width * 0.9,
    alignSelf: 'center',
    alignItems: 'flex-start',
  },
  iconInput: {
    fontSize: 24,
    color: DefaultTheme.colors.primary,
    paddingLeft: 16,
  },
  bunttonText: {
    fontSize: 16,
    color: DefaultTheme.colors.labelText,
    lineHeight: 20,
    paddingLeft: 14,
  },
})

const BusquedaScreen = props => {
  // eslint-disable-next-line react/prop-types
  const { componentId } = props
  const [busquedas, setBusquedas] = useState({
    isLoading: true,
    busquedasRecientes: [],
  })

  useNavigationComponentDidAppear(async () => {
    // INIT Busquedas
    BusquedasRecientes.get().then(data => setBusquedas({ busquedasRecientes: data, isLoading: false }))
  }, componentId)

  const { busquedasRecientes, isLoading } = busquedas

  return (
    <Container style={styles.container}>
      {/* COMPLEMENTE LOGO  */}
      <Image style={styles.image} resizeMode="contain" source={logos[Config.PORTAL]} />
      <Text style={styles.text}>{i18n.t('home:title')}</Text>

      {/* COMPLEMENTE BUTTON SCREEN FILTRAR  */}

      <ButtonUi
        text={i18n.t('home:placeholder_button')}
        iconLeft="Search"
        styles={{ button: styles.containerInput, text: styles.bunttonText, icon: styles.iconInput }}
        onPress={() => showModal(ScreenIds.BUSCADOR, {})}
      />
      {/* COMPLEMENTE BUSQUEDAS RECIENTES */}
      {isLoading ? (
        Loading.loaderForElement()
      ) : (
        <BusquedasRecientesList data={busquedasRecientes} showModal={showModal} />
      )}
    </Container>
  )
}

export default BusquedaScreen
