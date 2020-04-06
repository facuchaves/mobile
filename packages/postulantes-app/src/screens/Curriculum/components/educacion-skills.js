/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable global-require */
// IMPORTS
import React, { useState } from 'react'
import { Content, Card, CardItem, Text, Body } from 'native-base'
import { StyleSheet, View, FlatList } from 'react-native'
// import ThrottledTouchableOpacity from '../../../components/commons/ThrottledTouchableOpacity'
import i18n from '../../../i18n'
import { ButtonUi } from '../../../shared/ui-kit'
// THEME
import DefaultTheme from '../../../themes/DefaultTheme'

const styles = StyleSheet.create({
  container: {
    backgroundColor: DefaultTheme.colors.background,
  },
  containerTitulo: {
    backgroundColor: DefaultTheme.colors.white,
    borderBottomWidth: 0,
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
  item: {
    borderTopColor: DefaultTheme.colors.border,
    borderTopWidth: 1,
    marginBottom: 5,
  },
  subtitulo: {
    color: DefaultTheme.colors.secondaryText,
    fontWeight: 'normal',
    fontSize: 16,
  },
  texto: {
    borderTopWidth: 1,
    borderTopColor: DefaultTheme.colors.border,
    color: DefaultTheme.colors.labelText,
    fontWeight: 'normal',
    fontSize: 14,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  textoBody: {
    color: '#000',
    fontWeight: 'normal',
    fontSize: 14,
    padding: 5,
    borderRadius: 15,
    marginHorizontal: 5,
  },
  datoDefault: {
    color: DefaultTheme.colors.labelText,
    fontSize: 16,
    paddingBottom: 0,
    fontWeight: 'normal',
  },
  cardFooter: {
    borderTopColor: DefaultTheme.colors.border,
    borderTopWidth: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  iconAdd: {
    marginLeft: -7,
  },
  iconEdit: {
    minWidth: 10,
    height: 10,
    position: 'absolute',
    top: 10,
    right: 10,
    fontWeight: 'bold',
    zIndex: 1,
  },
  referenciaText: {
    color: DefaultTheme.colors.secondary,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 14,
    paddingVertical: 5,
  },
  flexRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  containerList: {
    flexDirection: 'row',
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
    marginVertical: 5,
    marginLeft: -5,
  },
})

const Skills = props => {
  // eslint-disable-next-line react/prop-types
  const { componentId, data } = props

  const [skills, setSkill] = useState([])

  const itemConocimiento = () => {
    if (data) {
      return data.map(item => {
        return (
          <CardItem key={item.id}>
            <Body>
              <View style={styles.flexRow}>
                <Text style={styles.datoDefidiomaNameault}>Frances</Text>
              </View>
              <View style={styles.flexRow}>
                <Text style={styles.datoDefault}> Oral - Itermedio</Text>
              </View>
            </Body>

            <ButtonUi
              transparent
              text={null}
              iconRight="Edit-1"
              styles={{
                icon: {
                  position: 'absolute',
                  right: -10,
                  fontWeight: 'bold',
                  zIndex: 1,
                  fontSize: 24,
                  color: DefaultTheme.colors.primary,
                },
              }}
              onPress={() => {
                console.log('PENDIENTE')
              }}
            />
          </CardItem>
        )
      })
    }

    return <Text>{i18n.t('curriculum:skills:empty')}</Text>
  }

  // const conocimientosInformatica = [{ nombre: 'Java - Avanzado' }, { nombre: 'Python - Experto' }]

  const renderList = itemToRender => {
    return (
      <FlatList
        data={itemToRender}
        contentContainerStyle={styles.containerList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.textoBody}>{item.nombre}</Text>}
      />
    )
  }

  return (
    <Content padder style={styles.container}>
      <Card style={styles.box}>
        <CardItem header style={styles.containerTitulo}>
          <Body>
            <Text style={styles.titulo}>{i18n.t('curriculum:skills:title')}</Text>
          </Body>
        </CardItem>

        <Text style={styles.texto}>{i18n.t('curriculum:skills:text')}</Text>

        {/* {conocimientosInformatica ? (
          <CardItem header bordered>
            <Body>
              <Text style={styles.subtitulo}>{i18n.t('curriculum:skill:')}</Text>
              {renderConocimientosInformatica()}
            </Body>
          </CardItem>
        ) : null}

        <CardItem header bordered>
          <Body>
            <Text style={styles.subtitulo}>{i18n.t('curriculum:skill:')}</Text>
            {renderConocimientosNormalizadosNoInformatica()}
            {renderConocimientosDesnormalizados()}
          </Body>
        </CardItem>
        <ThrottledTouchableOpacity
          onPress={() => {
            // eslint-disable-next-line no-console
            console.log('prueba')
          }}
        >
          <CardItem footer style={styles.cardFooter}>
            <Icon name="Add-circle" size={25} color="#51cf66" style={styles.iconAdd} />
            <Text style={styles.referenciaText}>{i18n.t('curriculum:skill:')}</Text>
          </CardItem>
        </ThrottledTouchableOpacity> */}
      </Card>
    </Content>
  )
}

export default Skills
