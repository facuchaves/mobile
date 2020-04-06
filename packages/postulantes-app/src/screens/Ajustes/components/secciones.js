/* eslint-disable no-console */
import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import PropTypes from 'prop-types'
import ThrottledTouchableOpacity from '../../../components/commons/ThrottledTouchableOpacity'
import { Icon } from '../../../shared/ui-kit'
// THEME
import DefaultTheme from '../../../themes/DefaultTheme'
// CONST
const { width } = Dimensions.get('screen')

const styles = StyleSheet.create({
  container: {
    margin: 15,
    marginLeft: 24,
    flex: 1,
    alignContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  containerText: {
    margin: 10,
    marginLeft: 20,
    marginTop: -3,
    flexDirection: 'column',
    alignContent: 'center',
  },
  titulo: {
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 24,
    color: DefaultTheme.colors.secondary,
  },
  texto: {
    width: width * 0.6,
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: 20,
    color: DefaultTheme.colors.primaryText,
    marginTop: 5,
  },
})

export const Seccion = ({ icon, titulo, texto, action }) => {
  return (
    <ThrottledTouchableOpacity onPress={action}>
      <View style={styles.container}>
        {icon ? (
          <Icon
            name={icon.name}
            size={icon.size}
            color="#231F20"
            style={[{ opacity: 0.28 }, icon.style && icon.style]}
          />
        ) : null}
        <View style={styles.containerText}>
          <Text style={styles.titulo}>{titulo}</Text>
          <Text style={styles.texto}>{texto}</Text>
        </View>
      </View>
    </ThrottledTouchableOpacity>
  )
}

Seccion.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.object]),
  titulo: PropTypes.string.isRequired,
  texto: PropTypes.string,
  action: PropTypes.func.isRequired,
}

Seccion.defaultProps = {
  icon: null,
  texto: null,
}
