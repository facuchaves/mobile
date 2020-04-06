// IMPORTS
import React, { useState } from 'react'
import { StyleSheet, Text, ScrollView, View } from 'react-native'
import { H1, H2, H3, Form, Content } from 'native-base'
import PropTypes from 'prop-types'

// FORM
import { Formik } from 'formik'
import * as yup from 'yup'
import { dismissModal } from '../../../navigation/helpers'
import i18n from '../../../i18n'
// SERVICIOS
import AvisoServices from '../../../api/avisos-service'
// THEME
import DefaultTheme from '../../../themes/DefaultTheme'
// UI-KIT
import HeaderBacic from '../../../shared/ui-kit/HeaderBasic'
import { TextArea, ButtonUi } from '../../../shared/ui-kit'
import ListAvisos from '../../../shared/ui-kit/ListAvisos'

const cartaStyles = StyleSheet.create({
  container: {
    backgroundColor: DefaultTheme.colors.background,
    padding: 0,
    paddingBottom: 30,
  },
  content: {
    flex: 1,
    backgroundColor: DefaultTheme.colors.white,
    marginHorizontal: 16,
    padding: 16,
    marginBottom: 30,
    borderRadius: 9,
  },
  h1: {
    fontSize: 18,
    lineHeight: 24,
    marginTop: 16,
    marginBottom: 45,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  h2: {
    textAlign: 'center',
    fontSize: 18,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 24,
    fontWeight: 'bold',
  },
  smallText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 'normal',
    paddingBottom: 10,
  },
  textStep2: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  contentStepIcon: {
    margin: 5,
    marginBottom: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
  },
  stepIcon: {
    width: 60,
    height: 6,
    borderRadius: 4,
    backgroundColor: '#aeadae',
    margin: 5,
  },
  stepIconActive: {
    width: 60,
    height: 6,
    borderRadius: 4,
    backgroundColor: DefaultTheme.colors.primary,
    margin: 5,
  },
  buttonSubmit: {
    marginTop: 10,
  },
  textButtonSubmit: {
    color: 'white',
    fontSize: 17,
  },
  textButtonOmit: { color: DefaultTheme.colors.primary, fontSize: 17 },
  errrorMenssage: {
    fontSize: 11,
    color: 'red',
    margin: 10,
    paddingLeft: 5,
  },
  contentRecommender: {
    backgroundColor: DefaultTheme.colors.white,
    padding: 10,
    paddingBottom: 5,
  },
  recomendadosTitulo: {
    textAlign: 'center',
    fontSize: 24,
    marginTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 30,
    fontWeight: 'bold',
    color: 'white',
  },
})

const CartaPresentacion = props => {
  // eslint-disable-next-line react/prop-types
  const { componentId, Aviso, idPostulacion } = props
  const [step, setStep] = useState(1)
  const [carta, setCarta] = useState(false)
  const [avisosRecomendados, setAvisosRecomendados] = useState([])

  // eslint-disable-next-line no-unused-vars
  const getAvisosRecomendados = async () => {
    const rs = await AvisoServices.getAvisosRecomendados(Aviso ? Aviso.id : null)
    setAvisosRecomendados(rs)
  }

  const guardarCartaPrensentacion = async nuevaCarta => {
    const rs = await AvisoServices.saveCartaPostulacion(idPostulacion, {
      cartaDePresentacion: nuevaCarta,
    })

    if (!rs.error) {
      setStep(2)
      setCarta(nuevaCarta)
    }
  }

  // SE COMENTA RECOMMERNDER YA QUE FALLA EL ENDPOINT
  /*  useEffect(() => {
    getAvisosRecomendados(Aviso)
  }, []) */

  // TEXTOS DINAMICOS
  const titulo = Aviso ? Aviso.titulo : ''
  const textConfirmacion = carta
    ? i18n.t('ficha_aviso:carta_presentacion:text_result_success')
    : i18n.t('ficha_aviso:carta_presentacion:text_result_skip')

  return (
    <>
      <HeaderBacic title={i18n.t('ficha_aviso:carta_presentacion:header_title')} />
      <ScrollView style={cartaStyles.container}>
        <H1 style={cartaStyles.h1}>{i18n.t('ficha_aviso:carta_presentacion:title')(titulo)}</H1>
        <View style={cartaStyles.contentStepIcon}>
          <Text style={step === 1 ? cartaStyles.stepIconActive : cartaStyles.stepIcon} />
          <Text style={step === 2 ? cartaStyles.stepIconActive : cartaStyles.stepIcon} />
        </View>
        {step === 2 ? (
          // SI ES EL STEP 1 MOSTRAMOS MENSAJE CONFIRMACION O OMISION
          <View style={cartaStyles.content} contentContainerStyle={{ flexGrow: 1 }}>
            <H3 style={cartaStyles.textStep2}>{textConfirmacion}</H3>
            <ButtonUi
              transparent
              info
              text={i18n.t('ficha_aviso:carta_presentacion:button_aviso')}
              onPress={() => dismissModal(componentId)}
              styles={{ text: { color: DefaultTheme.colors.primary, fontSize: 20 } }}
            />
          </View>
        ) : (
          // SI ES EL STEP 1 MOSTRAMOS EL FORM
          <View style={cartaStyles.content} contentContainerStyle={{ flexGrow: 1 }}>
            <H2 style={cartaStyles.h2}>{i18n.t('ficha_aviso:carta_presentacion:subtitle')}</H2>
            <Text style={cartaStyles.smallText}>{i18n.t('ficha_aviso:carta_presentacion:bajada')}</Text>
            <Formik
              initialValues={{ cartaPresentacion: null }}
              onSubmit={values => {
                guardarCartaPrensentacion(values.cartaPresentacion)
              }}
              validationSchema={yup.object().shape({
                cartaPresentacion: yup
                  .string()
                  .required()
                  .max(1000)
                  .required(i18n.t('validation:error_carta_presentacion')),
              })}
            >
              {({ values, setFieldValue, setFieldTouched, isValid, handleSubmit }) => (
                <Form>
                  <TextArea
                    rowSpan={5}
                    bordered={false}
                    maxLength={1000}
                    placeholder={i18n.t('ficha_aviso:carta_presentacion:placeholder')}
                    value={values.cartaPresentacion}
                    onChangeText={itemValue => {
                      setFieldValue('cartaPresentacion', itemValue)
                    }}
                    setFieldTouched={() => setFieldTouched('cartaPresentacion')}
                    styles={{ TextArea: { backgroundColor: '#f5f5f5' } }}
                  />

                  <ButtonUi
                    block
                    success
                    styles={{ button: cartaStyles.buttonSubmit, text: cartaStyles.textButtonSubmit }}
                    text={i18n.t('ficha_aviso:carta_presentacion:button_success')}
                    disabled={!isValid}
                    onPress={handleSubmit}
                  />

                  <ButtonUi
                    block
                    transparent
                    styles={{ button: cartaStyles.buttonSubmit, text: cartaStyles.textButtonOmit }}
                    text={i18n.t('ficha_aviso:carta_presentacion:button_skip')}
                    onPress={() => setStep(2)}
                  />
                </Form>
              )}
            </Formik>
          </View>
        )}
        {avisosRecomendados.length > 0 ? (
          <Content style={{ margin: 0, marginTop: 20, backgroundColor: DefaultTheme.colors.primary }}>
            <H2 style={cartaStyles.recomendadosTitulo}>
              {i18n.t('ficha_aviso:carta_presentacion:title_recomendados')}
            </H2>
            <ListAvisos avisos={avisosRecomendados} />
          </Content>
        ) : (
          <View />
        )}
      </ScrollView>
    </>
  )
}

CartaPresentacion.PropType = PropTypes.shape({
  idPostulacion: PropTypes.number.isRequired,
  Aviso: PropTypes.object.isRequired,
  componentId: PropTypes.any.isRequired,
})

CartaPresentacion.defaultProps = {
  idPostulacion: null,
  Aviso: null,
  componentId: null,
}

export default CartaPresentacion
