/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import color from 'color'
import { Container, Content, Accordion, H3, Text, Icon, View, List, ListItem } from 'native-base'
import { find } from 'lodash'
import i18n from '../../../i18n'
import DefaultTheme from '../../../themes/DefaultTheme'

import { ButtonUi } from '../../../shared/ui-kit'

// SERVICES
import StaticEntities from '../../../api/static-entities-services'

const styles = StyleSheet.create({
  titulo: {
    padding: 10,
    fontSize: 18,
    lineHeight: 24,
    color: DefaultTheme.colors.primaryText,
    fontWeight: 'bold',
  },
  textAllFilters: {
    fontSize: 14,
    color: '#000',
    lineHeight: 20,
    marginLeft: 10,
  },
  AccordionHeader: {
    backgroundColor: color('#000018')
      .alpha(0.04)
      .rgb()
      .string(),
    borderBottomWidth: 1,
    borderBottomColor: color('#000018')
      .alpha(0.16)
      .rgb()
      .string(),
    borderLeftWidth: 0,
    borderRightWidth: 0,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 52,
  },
  AccordionHeaderText: {
    fontSize: 16,
    color: DefaultTheme.colors.primaryText,
    fontWeight: 'bold',
    lineHeight: 20,
  },
  AccordionText: {
    color: DefaultTheme.colors.secondaryText,
    fontSize: 14,
    width: 200,
    fontFamily: 'Helvetica',
    fontWeight: 'normal',
    lineHeight: 20,
  },
  ContentItem: {
    padding: 0,
    borderBottomWidth: 0,
  },
  item: {
    marginLeft: 0,
    paddingLeft: 10,
  },
  count: {
    color: DefaultTheme.colors.tertiaryText,
    fontWeight: 'normal',
    lineHeight: 20,
    fontSize: 14,
    position: 'absolute',
    right: 10,
  },
})

const FilterSideBar = ({ filters, filtrosData, action, closeDrawer }) => {
  const _handleFilter = (filtro, item) => {
    const newFiltros = filtrosData

    switch (filtro) {
      case 'area':
        newFiltros.areasId = StaticEntities.getAreaByName(item.name) ? StaticEntities.getAreaByName(item.name).id : null
        break
      case 'provincia':
        newFiltros.provinciasId = StaticEntities.getProvinciaByName(item.name)
          ? StaticEntities.getProvinciaByName(item.name).id
          : null
        break
      case 'tipo_trabajo':
        newFiltros.tipo_trabajo = item.name
        break
      case 'dias_fecha_publicacion':
        newFiltros.diasFechaPublicacion = item.id
        break
      default:
        break
    }
    closeDrawer()
    action(0, newFiltros)
  }

  const _renderHeader = (item, expanded) => {
    if (item.content.length > 0) {
      // Valida que solo imprima si no esta aplicado el filtro
      return (
        <View style={styles.AccordionHeader}>
          <Text style={styles.AccordionHeaderText}> {item.title}</Text>
          {expanded ? (
            <Icon style={{ fontSize: 18 }} name="arrow-dropleft" />
          ) : (
            <Icon style={{ fontSize: 18 }} name="arrow-dropdown" />
          )}
        </View>
      )
    }
    return null
  }

  const _renderContent = filtros => {
    return (
      <List style={styles.ContentItem}>
        <FlatList
          data={filtros.content}
          renderItem={({ item }) => (
            <ListItem
              key={item.id}
              style={styles.item}
              onPress={() => {
                _handleFilter(filtros.type, item)
              }}
            >
              <Text style={styles.AccordionText}>{item.name}</Text>
              <Text style={styles.count}>{`(${item.quantity})`}</Text>
            </ListItem>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </List>
    )
  }

  const provincias = find(filters, { type: 'provincia' })
  const areas = find(filters, { type: 'area' })
  // const tipoTrabajo = find(filters, { type: 'tipo_trabajo' })
  const diasFechaPublicacion = find(filters, { type: 'dias_fecha_publicacion' })

  const dataArray = [
    {
      title: `${i18n.t('listado_avisos:filtros:provincia')}`,
      type: 'provincia',
      content: provincias ? provincias.facets : [],
    },
    {
      title: `${i18n.t('listado_avisos:filtros:area')}`,
      type: 'area',
      content: areas ? areas.facets : [],
    },
    /*   {
        title: `${i18n.t('listado_avisos:filtros:tipo-puesto')}`,
        type: 'tipo_trabajo',
        content: tipoTrabajo ? tipoTrabajo.facets : [],
      }, */
    {
      title: `${i18n.t('listado_avisos:filtros:fecha_publicacion')}`,
      type: 'dias_fecha_publicacion',
      content: diasFechaPublicacion ? diasFechaPublicacion.facets : [],
    },
  ]

  return (
    <Container style={styles.container}>
      <Content style={{ backgroundColor: '#FFFFFF' }}>
        <H3 style={styles.titulo}>{i18n.t('listado_avisos:filtros:title')}</H3>
        {provincias || areas || diasFechaPublicacion ? (
          <Accordion dataArray={dataArray} renderHeader={_renderHeader} renderContent={_renderContent} />
        ) : (
          <View>
            <Text style={styles.textAllFilters}>{i18n.t('listado_avisos:filtros:all_filter')}</Text>
            <ButtonUi
              transparent
              styles={{
                text: { fontSize: 14, color: DefaultTheme.colors.secondary, fontWeight: 'bold' },
              }}
              text={i18n.t('listado_avisos:filtros:clean')}
              disabled={false}
              onPress={() => {
                closeDrawer()
                action(0, {
                  query: null,
                  diasFechaPublicacion: null,
                  provinciasId: null,
                  areasId: null,
                })
              }}
            />
          </View>
        )}
      </Content>
    </Container>
  )
}

export default FilterSideBar
