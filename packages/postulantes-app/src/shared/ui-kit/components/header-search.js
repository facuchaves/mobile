/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Header, Item, Input } from 'native-base'
import i18n from '../../../i18n'
import DefaultTheme from '../../../themes/DefaultTheme'
import { Icon } from '..'

const HeaderSearch = ({ action, leftItem, dismissModal, openDrawer }) => {
  const [textInput, setTextInput] = useState()
  const onChangeSearchText = text => {
    action(text)
  }

  const leftComponent = leftItem.icon ? (
    <Icon
      name="Options-2"
      size={20}
      color={DefaultTheme.colors.primary}
      onPress={() => {
        openDrawer()
      }}
    />
  ) : null

  return (
    <Header searchBar rounded style={{ backgroundColor: DefaultTheme.colors.primary }}>
      <Item style={{ paddingHorizontal: 14, borderRadius: 9 }}>
        <Icon name="Arrow-left" color={DefaultTheme.colors.primary} size={20} onPress={() => dismissModal()} />
        <Input
          value={textInput || ''}
          placeholder={i18n.t('listado_avisos:filtros:placeholder')}
          onChange={text => setTextInput(text)}
          onEndEditing={evt => {
            onChangeSearchText(evt.nativeEvent.text)
            setTextInput('')
          }}
          style={{ marginLeft: 13 }}
        />
        {leftComponent}
      </Item>
    </Header>
  )
}

export const HeaderSearchUi = HeaderSearch
