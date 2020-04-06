/* eslint-disable global-require */
import React, { Component } from 'react'
import { List } from 'native-base'
import { FlatList } from 'react-native'
import { showModal } from '../../../navigation/helpers'
import i18n from '../../../i18n'
// Components
import Card from './card'

// UI
import { ButtonUi } from '../../../shared/ui-kit'

export default class ListadoCards extends Component {
  renderPagination = (loadMore, page, showPagination) => {
    const nextPage = page + 1
    if (showPagination) {
      return (
        <ButtonUi
          block
          success
          text={i18n.t('mis_postulaciones:button_loading_more')}
          styles={{
            button: { margin: 10 },
          }}
          onPress={() => loadMore(nextPage)}
        />
      )
    }
    return null
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { postulaciones, page, loadMore, showPagination } = this.props

    return (
      <List>
        <FlatList
          data={postulaciones}
          getItemLayout={this.layout}
          keyExtractor={(_item, index) => index.toString()}
          renderItem={({ item }) => <Card aviso={item} showModal={showModal} />}
          ListFooterComponent={this.renderPagination(loadMore, page, showPagination)}
        />
      </List>
    )
  }
}
