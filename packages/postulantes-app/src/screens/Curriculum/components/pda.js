import React, { useState } from 'react'
import { Content, Card, CardItem, Text } from 'native-base'
import { StyleSheet } from 'react-native'
import ThrottledTouchableOpacity from '../../../components/commons/ThrottledTouchableOpacity'
import { Icon } from '../../../shared/ui-kit'
import i18n from '../../../i18n'

// THEME
import DefaultTheme from '../../../themes/DefaultTheme'

const styles = StyleSheet.create({
  container: {
    backgroundColor: DefaultTheme.colors.background,
  },
  containerTitulo: {
    backgroundColor: DefaultTheme.colors.white,
    borderBottomColor: DefaultTheme.colors.border,
    borderBottomWidth: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 12,
    borderRadius: 8,
  },
  box: {
    borderRadius: 8,
  },
  titulo: {
    color: DefaultTheme.colors.primaryText,
    fontWeight: 'normal',
    fontSize: 18,
  },
  nuevo: {
    fontSize: 12,
    color: DefaultTheme.colors.white,
    fontWeight: 'bold',
    lineHeight: 16,
    backgroundColor: DefaultTheme.colors.secondary,
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 14,
    marginHorizontal: 16,
    marginVertical: 5,
  },
  containerShow: {
    backgroundColor: DefaultTheme.colors.white,
    flex: 1,
    alignSelf: 'stretch',
    textAlign: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  text: {
    color: DefaultTheme.colors.labelText,
    fontWeight: 'normal',
    fontSize: 14,
    margin: 15,
  },
  icon: {
    backgroundColor: '#ccc',
    borderRadius: 25,
    padding: 2,
  },
})

const Pda = props => {
  // eslint-disable-next-line react/prop-types
  const { tienePerfilPda, resumenPda } = props
  const [showResumenComplete, setShowResumenComplete] = useState(false)

  return (
    <Content padder style={styles.container}>
      <Card style={styles.box}>
        <CardItem header style={styles.containerTitulo}>
          <Text style={styles.titulo}>{i18n.t('curriculum:pda:header_title')}</Text>
          <Text style={styles.nuevo}>{i18n.t('curriculum:pda:new')}</Text>
        </CardItem>

        {tienePerfilPda ? (
          <>
            <Text style={styles.text} numberOfLines={showResumenComplete ? null : 2}>
              {resumenPda || i18n.t('curriculum:pda:error_resumen')}
            </Text>
            {resumenPda && (
              <ThrottledTouchableOpacity
                style={styles.containerShow}
                onPress={() => setShowResumenComplete(!showResumenComplete)}
              >
                <Icon
                  name={showResumenComplete ? 'Arrow-triangle-down' : 'Arrow-triangle-up'}
                  size={19}
                  style={styles.icon}
                  color="white"
                />
              </ThrottledTouchableOpacity>
            )}
          </>
        ) : (
          <Text style={styles.text}>{i18n.t('curriculum:pda:subtitle')}</Text>
        )}
      </Card>
    </Content>
  )
}

export default Pda
