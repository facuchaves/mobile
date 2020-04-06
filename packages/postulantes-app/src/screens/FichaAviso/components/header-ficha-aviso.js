/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable global-require */
import React from 'react'
import { StyleSheet, Dimensions, View } from 'react-native'
import { Text, Title } from 'native-base'
import i18n from '../../../i18n'
// UI
import { ButtonUi } from '../../../shared/ui-kit'
import DefaultTheme from '../../../themes/DefaultTheme'
import Logo from '../../../components/commons/logo-empresa'

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  containerHeader: {
    backgroundColor: DefaultTheme.colors.primary,
    width,
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
  },
  textSeccion: { marginLeft: 16, width: width * 0.6 },
  dateSeccion: { flexDirection: 'column' },
  buttonBack: {
    padding: 0,
    minWidth: 10,
    height: 10,
    alignSelf: 'flex-start',
  },
  image: {
    width: width / 4,
    alignSelf: 'flex-end',
    borderRadius: 8,
    marginTop: 12,
  },
  titulo: {
    fontSize: 18,
    color: '#fff',
    marginLeft: 0,
    alignSelf: 'flex-start',
  },
  nombreEmpresa: { fontSize: 14, color: '#fff' },
  localidad: { fontSize: 14, color: '#fff' },
  fecha: { fontSize: 11, color: '#fff', alignSelf: 'flex-end' },
})

const HeaderFichaAviso = props => {
  const { aviso, onBackButtonPress } = props

  return (
    <View span style={styles.containerHeader}>
      <View style={styles.textSeccion}>
        <ButtonUi
          Left
          transparent
          onPress={() => onBackButtonPress()}
          iconLeft="Arrow-left"
          styles={{
            icon: { fontSize: 22, color: 'white' },
            button: styles.buttonBack,
          }}
        />
        <Title style={styles.titulo}>{aviso.titulo}</Title>
        <Text style={styles.nombreEmpresa}>{aviso.empresa.denominacion}</Text>
        <Text style={styles.localidad} adjustsFontSizeToFit numberOfLines={1}>
          {aviso.localizacion.detalle}
        </Text>
      </View>
      <View style={styles.dateSeccion}>
        <Text style={styles.fecha}>{i18n.t('ficha_aviso:fecha')(aviso.fechaPublicacion)}</Text>

        <Logo LogoUrl={aviso.empresa.logoURL} styles={styles.image} />
      </View>
    </View>
  )
}

export default HeaderFichaAviso
