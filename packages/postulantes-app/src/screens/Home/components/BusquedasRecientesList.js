/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'native-base'
import i18n from '../../../i18n'
import ScreenIds from '../../../constants/ScreenIds'
// THEME
import DefaultTheme from '../../../themes/DefaultTheme'
import { ButtonUi } from '../../../shared/ui-kit'
import { BusquedasRecientes } from '../../../shared/utils/filtrosUtils'

const styles = StyleSheet.create({
  items: {
    backgroundColor: '#FFF',
    borderRadius: 0,
    marginVertical: 0,
    elevation: 0,
    borderBottomWidth: 1,
    borderBottomColor: DefaultTheme.colors.border,
    alignItems: 'stretch',
  },
  title: {
    fontSize: 16,
    textAlign: 'left',
    lineHeight: 20,
    color: DefaultTheme.colors.primaryText,
    marginTop: 20,
    marginLeft: 8,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: DefaultTheme.colors.labelText,
    lineHeight: 20,
    marginLeft: 10,
  },
  icons: {
    fontSize: 22,
    color: DefaultTheme.colors.primaryText,
    alignSelf: 'flex-start',
    position: 'absolute',
    right: 10,
  },
})

const BusquedasRecientesList = ({ data, showModal }) => {
  const redictAvisosList = filtros => {
    showModal(ScreenIds.LISTADO_AVISOS, {
      filtros,
    })
  }

  if (data && data !== '' && data.length > 0) {
    return (
      <View>
        <Text style={styles.title}>{i18n.t('home:subtitle')}</Text>

        {data.map((item, index) => {
          //
          return (
            <ButtonUi
              text={BusquedasRecientes.getLabel(item)}
              onPress={() => redictAvisosList(item)}
              key={index}
              iconRight="Arrow-right"
              styles={{
                icon: styles.icons,
                button: styles.items,
                text: styles.text,
              }}
            />
          )
        })}
      </View>
    )
  }
  return <Text />
}

export default BusquedasRecientesList
