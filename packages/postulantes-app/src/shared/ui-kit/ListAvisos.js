/* eslint-disable global-require */
import React, { useState } from 'react'
import { List } from 'native-base'
import { FlatList, Text, ActivityIndicator } from 'react-native'
import { showModal } from '../../navigation/helpers'
import i18n from '../../i18n'
import { ButtonUi } from '.'
// THEME
import DefaultTheme from '../../themes/DefaultTheme'
// Components
import ItemCardAviso from './itemCardAviso'

// eslint-disable-next-line react/prop-types
const ListAvisos = props => {
  const [isLonding, setLoading] = useState(false)

  // eslint-disable-next-line react/prop-types
  const { avisos, handleLoadMore, page, pagination } = props

  const renderPagination = () => {
    if (pagination && isLonding) {
      return <ActivityIndicator size="small" color={DefaultTheme.colors.primary} />
    }
    if (pagination) {
      return (
        <ButtonUi
          text={i18n.t('listado_avisos:button_load_more')}
          onPress={() => {
            setLoading(true)
            handleLoadMore(page)
          }}
          styles={{ button: { margin: 10, marginBottom: 30 } }}
        />
      )
    }

    return <Text />
  }

  // eslint-disable-next-line react/prop-types

  const flatlist = (
    <FlatList
      data={avisos}
      renderItem={({ item }) => <ItemCardAviso key={item.id} aviso={item} showModal={showModal} />}
      keyExtractor={(item, index) => index.toString()}
      ListFooterComponent={renderPagination()}
      onEndReached={() => setTimeout(() => setLoading(false), 2000)}
      onEndThreshold={0.5}
    />
  )
  return <List>{flatlist}</List>
}

export default ListAvisos
