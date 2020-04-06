import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { ButtonUi } from '../../../shared/ui-kit'
// THEME
import DefaultTheme from '../../../themes/DefaultTheme'

// SERVICES
import StaticEntities from '../../../api/static-entities-services'

// CONSTANTES
const { width } = Dimensions.get('screen')

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#dadfe5',
    marginTop: 0,
    // flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
    width,
  },
  tagItem: {
    // flex: 0.8,
    width: 'auto',
    flexDirection: 'row',
    backgroundColor: DefaultTheme.colors.primary,
    borderRadius: 4,
    paddingTop: 4,
    paddingLeft: 6,
    paddingBottom: 4,
    paddingRight: 10,
    margin: 8,
    textTransform: 'capitalize',
  },
  tagItemText: {
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 14,
    color: DefaultTheme.colors.accent,
  },
  close: {
    minWidth: 5,
    marginTop: 2,
    height: 13,
    fontSize: 13,
    color: DefaultTheme.colors.accent,
  },
})

const TagsFiltros = (filtros, filtrarFunction) => {
  return (
    <View style={styles.container}>
      {filtros.query ? (
        <View style={styles.tagItem}>
          <Text style={styles.tagItemText}>{`"${filtros.query}"`}</Text>
          <ButtonUi
            transparent
            info
            text={null}
            iconRight="Close"
            styles={{
              button: styles.close,
              icon: styles.close,
            }}
            onPress={() => {
              const newFiltros = filtros
              delete newFiltros.query
              filtrarFunction(0, newFiltros)
            }}
          />
        </View>
      ) : null}
      {filtros.provinciasId ? (
        <View style={styles.tagItem}>
          <Text style={styles.tagItemText}> {StaticEntities.getProvinciaById(filtros.provinciasId).nombre}</Text>

          <ButtonUi
            transparent
            info
            text={null}
            iconRight="Close"
            styles={{
              button: styles.close,
              icon: styles.close,
            }}
            onPress={() => {
              const newFiltros = filtros
              delete newFiltros.provinciasId
              filtrarFunction(0, newFiltros)
            }}
          />
        </View>
      ) : null}
      {filtros.areasId ? (
        <View style={styles.tagItem}>
          <Text style={styles.tagItemText}> {StaticEntities.getAreaById(filtros.areasId).nombre}</Text>

          <ButtonUi
            transparent
            info
            text={null}
            iconRight="Close"
            styles={{
              button: styles.close,
              icon: styles.close,
            }}
            onPress={() => {
              const newFiltros = filtros
              delete newFiltros.areasId
              filtrarFunction(0, newFiltros)
            }}
          />
        </View>
      ) : null}
      {filtros.diasFechaPublicacion != null ? (
        <View style={styles.tagItem}>
          <Text style={styles.tagItemText}>
            {parseInt(filtros.diasFechaPublicacion, 10) === 0
              ? 'Hoy'
              : `publicados hace ${filtros.diasFechaPublicacion} días`}
          </Text>

          <ButtonUi
            transparent
            info
            text={null}
            iconRight="Close"
            styles={{
              button: styles.close,
              icon: styles.close,
            }}
            onPress={() => {
              const newFiltros = filtros
              delete newFiltros.diasFechaPublicacion
              filtrarFunction(0, newFiltros)
            }}
          />
        </View>
      ) : null}

      {filtros.tipo_trabajo ? (
        <View style={styles.tagItem}>
          <Text style={styles.tagItemText}>{filtros.tipo_trabajo}</Text>

          <ButtonUi
            transparent
            text={null}
            iconRight="Close"
            styles={{
              button: styles.close,
              icon: styles.close,
            }}
            onPress={() => {
              const newFiltros = filtros
              delete newFiltros.tipo_trabajo
              filtrarFunction(0, newFiltros)
            }}
          />
        </View>
      ) : null}
    </View>
  )
}

export default TagsFiltros
