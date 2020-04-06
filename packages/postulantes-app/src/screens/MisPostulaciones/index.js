/* eslint-disable no-console */
/* eslint-disable react/no-unused-state */
// IMPORTS
import React, { useState } from 'react'
import { Container, Content, Text } from 'native-base'
import { StyleSheet, View } from 'react-native'
import { useNavigationComponentDidAppear } from 'react-native-navigation-hooks'
import i18n from '../../i18n'

import Request, { Get } from '../../hooks/api/restClient'

// THEME
import DefaultTheme from '../../themes/DefaultTheme'

// UI
import { ButtonUi, Loading } from '../../shared/ui-kit'

// COMPONENTS
import HeaderBasic from '../../shared/ui-kit/HeaderBasic'
import ListadoMisPostulaciones from './components/container-listado'
import SliderContainer from './components/slider-container'
import FiltroEstado from './components/filtros-estado'

const styles = StyleSheet.create({
  container: {
    backgroundColor: DefaultTheme.colors.background,
  },
  containerAvisos: {
    margin: 0,
    marginTop: 0,
    backgroundColor: DefaultTheme.colors.background,
    paddingTop: 10,
  },
  containerFiltros: {
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
  },
  h3: {
    color: '#4a4a4a',
    paddingLeft: 5,
    paddingTop: 10,
    fontSize: 16,
    lineHeight: 20,
  },
  containerSort: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    padding: 10,
  },
  buttonSortDefault: {
    height: 27,
    paddingBottom: 5,
    paddingTop: 5,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: DefaultTheme.colors.primary,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 0,
  },
  buttonSortActive: {
    backgroundColor: DefaultTheme.colors.primary,
    height: 27,
    paddingBottom: 5,
    paddingTop: 5,
    borderWidth: 1,
    borderColor: DefaultTheme.colors.primary,
    textAlign: 'center',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 0,
  },
  textSortActive: {
    color: '#fff',
    fontSize: 12,
    alignSelf: 'center',
  },
  textSortDefault: {
    color: DefaultTheme.colors.primary,
    fontSize: 12,
  },
  containerLoading: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
})

// eslint-disable-next-line react/prop-types
const MisPostulacionScreen = ({ componentId }) => {
  const [postulaciones, setPostulaciones] = useState([])
  const [facets, setFacets] = useState([])
  const [Page, setPage] = useState({ isLoading: true, hasError: false, total: 0, page: 0 })

  const [filtros, setFiltros] = useState({
    sort: 'fechaPublicacionAviso',
    estado: [],
  })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getListPostulaciones = async (newFiltros, newPage) => {
    // SETEO AL INICIO PARA ACTUALIZAR COMPONENTE VISUALES
    setFiltros(newFiltros)
    try {
      const request = new Request()
      request.path = `/candidates/postulaciones?pageSize=20&page=${newPage}&sort=${newFiltros.sort} desc`
      request.method = Get
      // VALIDO RESTO DE newFiltros
      request.path =
        newFiltros.estado && newFiltros.estado.length > 0
          ? `${request.path}&estados=${newFiltros.estado.toString()}`
          : request.path
      const response = await request.call()
      if (response) {
        const avisosToSave = newPage === 0 ? response.content : [...postulaciones, ...response.content]
        setPostulaciones(avisosToSave)
        setFacets(response.filters[0])
        setPage({ ...Page, total: response.total, page: newPage, isLoading: false })
      }
    } catch (error) {
      setFiltros(newFiltros)
      console.log(`ERROR REQUEST MIS POSTULACIONES ${error}`)
      setPage({ ...Page, hasError: true })
    }
  }

  const changeSortAvisos = filtersSort => {
    setPage({ ...Page, isLoading: true })
    const newFiltros = { ...filtros }
    newFiltros.sort = filtersSort
    getListPostulaciones(newFiltros, 0)
  }

  const changeFiltroEstado = async filtroEstado => {
    const filtrosPrev = { ...filtros }
    const estadosSet = new Set(filtrosPrev.estado)
    const existeItem = estadosSet.has(filtroEstado)

    if (filtroEstado === null) {
      filtrosPrev.estado = []
    } else if (filtrosPrev.estado.length === 0 && filtroEstado) {
      filtrosPrev.estado.push(filtroEstado)
    } else if (existeItem) {
      estadosSet.delete(filtroEstado)
      filtrosPrev.estado = Array.from(estadosSet)
    } else {
      estadosSet.add(filtroEstado)
      filtrosPrev.estado = Array.from(estadosSet)
    }

    setPage({ ...Page, isLoading: true })
    getListPostulaciones(filtrosPrev, 0)
  }

  const loadMore = async page => {
    await setPage({ ...Page, isLoading: true })
    await getListPostulaciones(filtros, page)
  }

  useNavigationComponentDidAppear(() => {
    setPage({ ...Page, isLoading: true })
    getListPostulaciones(filtros, 0)
  }, componentId)

  return (
    <Container style={styles.container}>
      <HeaderBasic title={i18n.t('mis_postulaciones:header_title')} />
      <Container>
        <Content style={styles.containerAvisos}>
          <SliderContainer filters={facets.facets} />
          {/* FILTRO */}
          <FiltroEstado handleChange={changeFiltroEstado} estados={filtros.estado} />
          {/* ORDER */}
          <View style={styles.containerFiltros}>
            <Text style={styles.h3}>{i18n.t('mis_postulaciones:order')}</Text>
          </View>
          {/* LISTADO */}
          <View style={styles.containerSort}>
            <ButtonUi
              text={i18n.t('mis_postulaciones:filtros:order_by:fecha_publicacion')}
              styles={{
                text: filtros.sort === 'fechaPublicacionAviso' ? styles.textSortActive : styles.textSortDefault,
                button: [
                  filtros.sort === 'fechaPublicacionAviso' ? styles.buttonSortActive : styles.buttonSortDefault,
                  {
                    borderBottomLeftRadius: 5,
                    borderTopLeftRadius: 5,
                  },
                ],
              }}
              onPress={() => changeSortAvisos('fechaPublicacionAviso')}
            />

            <ButtonUi
              text={i18n.t('mis_postulaciones:filtros:order_by:fecha_postulacion')}
              styles={{
                text: filtros.sort === 'fechaPostulacion' ? styles.textSortActive : styles.textSortDefault,
                button: [
                  filtros.sort === 'fechaPostulacion' ? styles.buttonSortActive : styles.buttonSortDefault,
                  {
                    borderBottomRightRadius: 5,
                    borderTopRightRadius: 5,
                  },
                ],
              }}
              onPress={() => changeSortAvisos('fechaPostulacion')}
            />
          </View>
          {Page.isLoading ? (
            Loading.loaderForElement()
          ) : (
            <ListadoMisPostulaciones
              postulaciones={postulaciones}
              filtros={filtros}
              loadMore={loadMore}
              page={Page.page}
              showPagination={Page.total > postulaciones.length}
            />
          )}
        </Content>
      </Container>
    </Container>
  )
}

export default MisPostulacionScreen
