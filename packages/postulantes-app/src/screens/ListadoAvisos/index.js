/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */

// IMPORTS
import React, { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { Container, Text, Content, Drawer } from 'native-base'
import { dismissModal, showModal } from '../../navigation/helpers'
import i18n from '../../i18n'
import Request, { Post } from '../../hooks/api/restClient'

// THEMES
import DefaultTheme from '../../themes/DefaultTheme'

// COMPONENTS
import { HeaderSearchUi, Loading } from '../../shared/ui-kit'
import ListAvisos from '../../shared/ui-kit/ListAvisos'
import EmptyListing from './components/empty-list'

import FilterSideBar from './components/side-bar'
import TagsFiltros from './components/tags-filtros'
import ScreenIds from '../../constants/ScreenIds'

const styles = StyleSheet.create({
  container: {
    backgroundColor: DefaultTheme.colors.background,
  },
  containerAvisos: {
    backgroundColor: DefaultTheme.colors.background,
    paddingTop: 10,
    paddingBottom: 100,
  },
  countAvisos: {
    backgroundColor: '#fff',
    color: DefaultTheme.colors.primaryText,
    paddingLeft: 12,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 16,
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

const ListadoAvisosScreen = props => {
  const { componentId, filtros } = props
  const [avisos, setAvisos] = useState([])
  const [facets, setFacets] = useState([])
  const [draw, setDraw] = useState()
  const [filtrosAplicables, setFiltrosAplicables] = useState({
    query: null,
    provinciasId: null,
    areasId: null,
    tipo_trabajo: null,
    diasFechaPublicacion: null,
  })
  const [page, setPage] = useState({
    hasError: false,
    isLoading: true,
    total: '',
    page: 0,
  })

  const closeDrawer = () => {
    draw._root.close()
  }

  const openDrawer = () => {
    draw._root.open()
  }

  const filtrarAvisos = async (pageNumber, filtrosNuevos) => {
    setPage({ ...page, isLoading: true })
    try {
      const request = new Request()
      request.path = `/avisos/search?&pageSize=20&page=${pageNumber}`
      request.body = filtrosNuevos || filtrosAplicables
      request.method = Post
      const response = await request.call()

      const avisosToSave = pageNumber === 0 ? response.content : [...avisos, ...response.content]
      setAvisos(avisosToSave)
      setFacets(response.filters)
      setPage({ hasError: false, isLoading: false, total: response.total, page: pageNumber + 1 })
      setFiltrosAplicables(filtrosNuevos || filtrosAplicables)
    } catch (error) {
      setPage({ ...page, hasError: true, isLoading: false })
      console.log(`ERROR EN EL REQUEST ${JSON.stringify(filtrosNuevos)}`)
    }
  }

  const bindTextSearch = async text => {
    const newFiltro = { ...filtrosAplicables, ...{ query: text } }
    filtrarAvisos(0, newFiltro)
  }

  const listAvisosRender = avisosToRender => {
    if (avisosToRender.length > 0 && avisosToRender !== undefined && avisosToRender !== '') {
      return (
        <Content style={styles.containerAvisos}>
          <ListAvisos
            avisos={avisosToRender}
            handleLoadMore={filtrarAvisos}
            page={page.page}
            pagination={page.total > avisosToRender.length}
          />
        </Content>
      )
    }
    return (
      <Content style={styles.container}>
        <EmptyListing dismissModal={() => dismissModal(componentId)} />
      </Content>
    )
  }

  useEffect(() => {
    filtrarAvisos(page.page, filtros)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (page.hasError) {
    showModal(ScreenIds.BOOT_ERROR)
  }

  return (
    <Drawer
      ref={ref => {
        setDraw(ref)
      }}
      content={
        <FilterSideBar
          action={filtrarAvisos}
          filters={facets}
          filtrosData={filtrosAplicables}
          closeDrawer={() => closeDrawer()}
        />
      }
      onClose={() => closeDrawer}
      side="right"
      openDrawerOffset={0.3}
      panCloseMask={0.3}
    >
      <Container style={styles.container}>
        {/* HEADER SEARCH BAR */}
        <HeaderSearchUi
          dismissModal={() => dismissModal(componentId)}
          action={bindTextSearch}
          openDrawer={openDrawer}
          leftItem={{
            icon: true,
          }}
        />

        {/* BODY VIEW */}
        {page.isLoading ? (
          Loading.loader()
        ) : (
          <>
            {page.total !== 0 ? (
              <Text style={styles.countAvisos}>
                {page.total} {i18n.t('listado_avisos:count_empleos')}
              </Text>
            ) : null}

            {TagsFiltros(filtrosAplicables, filtrarAvisos)}
            {listAvisosRender(avisos)}
          </>
        )}
      </Container>
    </Drawer>
  )
}

export default ListadoAvisosScreen
