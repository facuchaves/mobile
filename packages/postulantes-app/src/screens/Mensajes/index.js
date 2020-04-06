/* eslint-disable global-require */
// IMPORTS
import React, { useState, useEffect } from 'react'
import { StyleSheet, RefreshControl, FlatList } from 'react-native'
import { Container, Content } from 'native-base'
import i18n from '../../i18n'
// SERVICES
import CuentaServices from '../../api/cuenta-service'
// THEME
import DefaultTheme from '../../themes/DefaultTheme'
// COMPONENTS
import HeaderBasic from '../../shared/ui-kit/HeaderBasic'
import ItemMensajes from './components/itemMensajes'
import EmptyList from './components/empty-list'

const styles = StyleSheet.create({
  container: {
    backgroundColor: DefaultTheme.colors.background,
  },
  containerMensajes: {
    margin: 0,
    marginTop: 0,
    backgroundColor: DefaultTheme.colors.background,
    paddingTop: 5,
  },
})

const Mensajes = () => {
  const [mensajes, setMensajes] = useState([])
  const [loading, setLoading] = useState(true)

  const getDataMensajes = async () => {
    setLoading(true)
    const data = await CuentaServices.getMensajes()
    setMensajes(data.content)
    setLoading(false)
  }

  useEffect(() => {
    getDataMensajes()
  }, [])

  const getListMensajes = () => {
    return (
      <FlatList
        data={mensajes}
        enableEmptySections
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <ItemMensajes mensaje={item} updateMensajes={getDataMensajes} />}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={getDataMensajes} />}
        ListEmptyComponent={() => <EmptyList />}
      />
    )
  }

  return (
    <Container style={styles.container}>
      <HeaderBasic title={i18n.t('mensajes:title')} />
      <Content>
        {/* LISTADO */}
        <Content style={styles.containerMensajes}>{getListMensajes()}</Content>
      </Content>
    </Container>
  )
}

export default Mensajes
