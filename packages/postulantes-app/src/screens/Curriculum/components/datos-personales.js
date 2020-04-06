/* eslint-disable global-require */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { Body, Content } from 'native-base'
import ThrottledTouchableOpacity from '../../../components/commons/ThrottledTouchableOpacity'
import i18n from '../../../i18n'
import { showModal } from '../../../navigation/helpers'
import { Icon } from '../../../shared/ui-kit'
// THEME
import DefaultTheme from '../../../themes/DefaultTheme'
import Avatar from '../../../components/commons/avatar'

const styles = StyleSheet.create({
  container: {
    backgroundColor: DefaultTheme.colors.white,
  },
  avatar: {
    alignSelf: 'center',
    marginTop: 20,
    width: 90,
    height: 90,
    borderRadius: 75,
  },
  name: {
    color: DefaultTheme.colors.primaryText,
    fontSize: 18,
    alignSelf: 'center',
    fontWeight: 'bold',
    paddingVertical: 4,
  },
  detalle: {
    fontSize: 16,
    color: DefaultTheme.colors.fourthText,
    paddingBottom: 15,
  },
  icnDisability: {
    position: 'absolute',
    right: -20,
    top: 0,
  },
  image: { paddingBottom: 15 },
  editIcon: {
    position: 'absolute',
    top: 30,
    right: 25,
  },
})

const DatosPersonales = props => {
  const { data, updateCv } = props

  return (
    <View style={styles.container}>
      <Content>
        <Avatar src={data.fotoURL && data.fotoURL.replace('cvMainPic', 'cvOriginalPic')} styles={styles.avatar} />
        <ThrottledTouchableOpacity
          style={styles.editIcon}
          onPress={() => {
            showModal('EDIT_DATOS_PERSONALES', {
              data,
              updateCv,
            })
          }}
        >
          <Icon name="Edit-1" color={DefaultTheme.colors.primary} size={25} />
        </ThrottledTouchableOpacity>
      </Content>
      <Text style={styles.name}>
        {data.nombre} {data.apellido}
      </Text>
      <Body style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        <Text style={styles.detalle}>
          {data.fechaNacimiento ? i18n.t('curriculum:datos_personales:edad')(data.fechaNacimiento) : ''}
        </Text>
        <Text style={styles.detalle}>
          {data.estadoCivil ? i18n.t('curriculum:datos_personales:civil')(data.estadoCivil.nombre) : ''}
        </Text>
        <Text style={styles.detalle}>
          {data.numeroDocumento ? i18n.t('curriculum:datos_personales:dni')(data.numeroDocumento) : ''}
        </Text>
        {data.discapacidad ? <Icon name="disability" size={25} style={styles.icnDisability} /> : null}
      </Body>
    </View>
  )
}

export default DatosPersonales
