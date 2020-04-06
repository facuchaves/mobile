/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Content } from 'native-base'
import EmptyList from './empty-list'
import DefaultTheme from '../../../themes/DefaultTheme'

import ListadoCards from './listado-cards'

const styles = StyleSheet.create({
  container: {
    backgroundColor: DefaultTheme.colors.backgroundColor,
    marginBottom: 20,
  },
  containerAvisos: {
    margin: 0,
    marginTop: 0,
    backgroundColor: DefaultTheme.colors.backgroundColor,
    paddingTop: 20,
    paddingLeft: 5,
    paddingRight: 5,
  },
  tab: {
    paddingBottom: 10,
  },
  buttonStyle: { backgroundColor: '#fff' },
  textStyle: { color: '#4a4a4a' },
  activeButtonStyle: { backgroundColor: '#329af0' },
  activeTextStyle: { color: '#fff', fontWeight: 'normal' },
})

export default class ListadoMisPostulaciones extends Component {
  getListadoMisPostulaciones = (postulaciones, page, loadMore, showPagination) => {
    if (postulaciones.length > 0) {
      return (
        <ListadoCards postulaciones={postulaciones} page={page} loadMore={loadMore} showPagination={showPagination} />
      )
    }
    return <EmptyList />
  }

  render() {
    const { loadMore, postulaciones, page, showPagination, filtros } = this.props
    return (
      <Content style={styles.container}>
        {this.getListadoMisPostulaciones(postulaciones, page, loadMore, showPagination, filtros)}
      </Content>
    )
  }
}
