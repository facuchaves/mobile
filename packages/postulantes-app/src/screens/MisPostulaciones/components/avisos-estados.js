import React from 'react'
import { StyleSheet, Text } from 'react-native'
import i18n from '../../../i18n'

const styles = StyleSheet.create({
  estadoStyleBase: {
    borderRadius: 8,
    fontSize: 12,
    paddingHorizontal: 16,
    paddingVertical: 5,
    marginHorizontal: 10,
    marginBottom: 7,
  },
  avisoEnviado: {
    backgroundColor: '#d9f7ff',
    color: '#00aaf4',
  },
  avisoFinalizado: {
    backgroundColor: '#eaeaea',
    color: '#9f9f9f',
  },
  avisoLeido: {
    backgroundColor: '#eaeaea',
    color: '#9f9f9f',
  },
  avisoEspera: {
    backgroundColor: '#fff4cf',
    color: '#e7a300',
  },
  avisoContactado: {
    backgroundColor: '#dae9ff',
    color: '#2a70ef',
  },
  avisoDefault: {
    backgroundColor: '#f5dcdc',
    color: '#cf5151',
  },
})

const EstadosComponent = props => {
  // eslint-disable-next-line react/prop-types
  const { estado } = props
  switch (estado) {
    case 'recibido':
      return (
        <Text style={[styles.avisoEnviado, styles.estadoStyleBase]}>{i18n.t('mis_postulaciones:estados:enviado')}</Text>
      )
    case 'finalizada':
      return (
        <Text style={[styles.avisoFinalizado, styles.estadoStyleBase]}>
          {i18n.t('mis_postulaciones:estados:finalizado')}
        </Text>
      )
    case 'leido':
      return (
        <Text style={[styles.avisoLeido, styles.estadoStyleBase]}>{i18n.t('mis_postulaciones:estados:leido')}</Text>
      )
    case 'contactado':
      return (
        <Text style={[styles.avisoContactado, styles.estadoStyleBase]}>
          {i18n.t('mis_postulaciones:estados:contactado')}
        </Text>
      )
    default:
      return (
        <Text style={[styles.avisoEspera, styles.estadoStyleBase]}>{i18n.t('mis_postulaciones:estados:espera')}</Text>
      )
  }
}

export default EstadosComponent
