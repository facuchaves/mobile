/* eslint-disable react/prop-types */
// IMPORTS
import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { Container, Content, Text, Root } from 'native-base'
import i18n from '../../i18n'
import { dismissModal } from '../../navigation/helpers'
import Request, { Get, Post } from '../../hooks/api/restClient'

// THEME
import DefaultTheme from '../../themes/DefaultTheme'
// UI
import { ButtonUi, Icon } from '../../shared/ui-kit'

// COMPONENTS
import HeaderFichaAviso from './components/header-ficha-aviso'
import BodyFichaAviso from './components/body-ficha-aviso'
import ListAvisos from '../../shared/ui-kit/ListAvisos'
import { Postulacion } from './components/postulacion'

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: DefaultTheme.colors.background,
    textAlign: 'center',
    margin: 0,
  },

  h2: {
    fontSize: 16,
    color: '#FFF',
    paddingLeft: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  checkboxContainer: {
    marginLeft: 5,
    marginTop: 0,
    height: 'auto',
    borderBottomWidth: 0,
  },
  empresaButton: {
    marginHorizontal: 16,
    flexDirection: 'row',
    paddingHorizontal: 0,
    marginVertical: 0,
  },
  empresaButtonText: {
    color: DefaultTheme.colors.primary,
    fontSize: 18,
    lineHeight: 24,
    paddingRight: 20,
    alignSelf: 'center',
  },
  empresaButtonIcon: {
    position: 'absolute',
    right: 15,
    marginTop: 17,
    fontSize: 18,
    color: DefaultTheme.colors.primary,
  },
})

const FichaAvisoScreen = props => {
  const { idAviso, componentId, areasId } = props

  const [aviso, setAviso] = useState([])
  const [avisosRecomendados, setAvisosRecomendados] = useState([])
  const [postulacion, setPostulacion] = useState(null)
  const [hasError, setHasError] = useState(false)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getFichaAviso = async () => {
    // eslint-disable-next-line no-console
    const request = new Request()
    // eslint-disable-next-line react/destructuring-assignment

    request.path = `/candidates/fichaAviso/${idAviso}`

    request.method = Get
    await request
      .call()
      .then(data => {
        if (data) {
          setAviso(data.aviso)
          setPostulacion(data.postulacion)
          setHasError(false)
        }
      })
      .catch(Exception => {
        setHasError(true)
        // eslint-disable-next-line no-console
        console.log(`Hubo un problema con la petición :${Exception.message}`)
      })
  }

  const getAvisosRecomendados = async () => {
    const request = new Request()
    request.path = `/avisos/search?&pageSize=5&page=1`
    request.body = { areasId }
    request.method = Post
    const data = await request.call()
    setHasError(false)
    setAvisosRecomendados(data.content)
  }

  useEffect(() => {
    const init = async () => {
      await getFichaAviso()
      await getAvisosRecomendados()
    }
    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderAvisosRecomendados = () => {
    if (avisosRecomendados) {
      return (
        <Content style={{ margin: 0, marginTop: 20, backgroundColor: DefaultTheme.colors.primary }}>
          <Text style={styles.h2}>{i18n.t('ficha_aviso:avisos_recomendados')}</Text>
          <ListAvisos pageSize="30" avisos={avisosRecomendados} />
        </Content>
      )
    }
    return <Text />
  }

  const renderOnError = () => {
    dismissModal(componentId)
  }

  const renderOnSuccess = () => {
    return (
      <Root>
        <Container style={styles.container}>
          {/* COMPONENTE HEADER AVISO */}
          <HeaderFichaAviso onBackButtonPress={() => dismissModal(componentId)} aviso={aviso} />
          <Content>
            {/* COMPONENTE BODY AVISO */}
            <BodyFichaAviso aviso={aviso} />

            {/* COMPONENTE POSTULACION */}
            <Postulacion aviso={aviso} postulacion={postulacion} reloadData={() => getFichaAviso()} />

            {/* COMPONENTE EMPLEOS EMPRESAS */}
            <View>
              <ButtonUi
                transparent
                styles={{
                  text: styles.empresaButtonText,
                  button: styles.empresaButton,
                }}
                numberOfLines={1}
                text={i18n.t('ficha_aviso:empleos_en')(aviso.empresa.denominacion)}
              />
              <Icon name="Arrow-ios-right" size={16} style={styles.empresaButtonIcon} />
            </View>
            {/* COMPONENTE EMPLEOS RELACIONADOS */}
            {renderAvisosRecomendados(avisosRecomendados)}
          </Content>
        </Container>
      </Root>
    )
  }

  // eslint-disable-next-line no-undef
  if (hasError) {
    return renderOnError()
  }
  if (aviso.titulo) {
    return renderOnSuccess(aviso, avisosRecomendados, postulacion)
  }

  return <Text />
}

FichaAvisoScreen.propTypes = {
  componentId: PropTypes.string.isRequired,
}

export default FichaAvisoScreen
