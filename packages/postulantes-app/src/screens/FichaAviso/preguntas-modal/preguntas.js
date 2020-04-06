import React from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { Text, Form, Item, Container, Content } from 'native-base'
import { Formik } from 'formik'
import * as yup from 'yup'
import i18n from '../../../i18n'
import { dismissModal } from '../../../navigation/helpers'
import PreguntaSimple from './pregunta-simple'
import PreguntaChoice from './pregunta-choice'
import HeaderBasic from '../../../shared/ui-kit/HeaderBasic'

// ui
import { ButtonUi } from '../../../shared/ui-kit'
import DefaultTheme from '../../../themes/DefaultTheme'

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    lineHeight: 24,
    marginVertical: 10,
    paddingHorizontal: 40,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  form: {
    backgroundColor: DefaultTheme.colors.white,
    borderRadius: 8,
    padding: 0,
    margin: 12,
  },
  buttonPostular: {
    marginHorizontal: 16,
    marginVertical: 20,
  },
  buttonPostularText: {
    color: '#FFF',
    textAlign: 'center',
  },
})

const Preguntas = ({
  preguntas,
  idAviso,
  salarioBrutoPretendido,
  actualizarSalario,
  onPostularHandler,
  componentId,
  callback: callbackInput,
}) => {
  const postularCatch = async formData => {
    const respuestas = formData
      ? Object.keys(formData).map(e => {
          return { preguntaId: e, respuesta: `${formData[e]}` }
        })
      : []
    const callback = () => {
      if (callbackInput) callbackInput()
    }
    onPostularHandler({ respuestas, idAviso, salarioBrutoPretendido, actualizarSalario, callback })
    // cerramos modal preguntas en esta instacia tanto con success postulacion como con error. Se ejecuta un tost al
    // nivel root con el error
    dismissModal(componentId)
  }

  const generateValidationScheme = () => {
    const shape = {}
    preguntas.forEach(pregunta => {
      if (pregunta.simple) shape[pregunta.simple.id] = yup.string().required(i18n.t('validation:error_preguntas'))
      if (pregunta.choice)
        shape[pregunta.choice.id] = yup.string().required(i18n.t('validation:error_preguntas_choice'))
    })
    return yup.object().shape(shape)
  }

  const validationSchema = generateValidationScheme()
  const initialValuesForm = {}
  return (
    <>
      <HeaderBasic title={i18n.t('ficha_aviso:pregunta:modal:title')} />
      <Container style={{ backgroundColor: DefaultTheme.colors.background }}>
        <Content>
          <Text style={styles.title}>{i18n.t('ficha_aviso:pregunta:title')}</Text>
          <Formik
            initialValues={initialValuesForm}
            validationSchema={validationSchema}
            onSubmit={values => postularCatch(values)}
          >
            {({
              values,
              setFieldValue,
              handleSubmit,
              errors,
              setFieldTouched,
              isValid /* touched, handleChange */,
            }) => (
              <Form style={styles.form}>
                {preguntas.map((pregunta, index) => {
                  return (
                    // eslint-disable-next-line react/no-array-index-key
                    <Item key={index} bordered={false} style={{ borderBottomWidth: 0 }}>
                      {pregunta.simple ? (
                        <PreguntaSimple
                          {...pregunta.simple}
                          errors={errors}
                          setFieldValue={setFieldValue}
                          setFieldTouched={setFieldTouched}
                          values={values}
                        />
                      ) : null}
                      {pregunta.choice ? (
                        <PreguntaChoice
                          {...pregunta.choice}
                          errors={errors}
                          setFieldValue={setFieldValue}
                          values={values}
                        />
                      ) : null}
                    </Item>
                  )
                })}

                <ButtonUi
                  text={i18n.t('ficha_aviso:pregunta:button_submit')}
                  styles={{ text: styles.buttonPostularText, button: styles.buttonPostular }}
                  onPress={handleSubmit}
                  disabled={!isValid}
                />
              </Form>
            )}
          </Formik>
        </Content>
      </Container>
    </>
  )
}
export default Preguntas

Preguntas.propTypes = {
  idAviso: PropTypes.number.isRequired,
  preguntas: PropTypes.arrayOf(
    PropTypes.shape({
      simple: PropTypes.shape({ id: PropTypes.number.isRequired, texto: PropTypes.string.isRequired }),
      choice: PropTypes.shape({
        id: PropTypes.number.isRequired,
        texto: PropTypes.string.isRequired,
        opciones: PropTypes.arrayOf(
          PropTypes.shape({ id: PropTypes.number.isRequired, opcion: PropTypes.string.isRequired }).isRequired
        ),
      }),
    }).isRequired
  ).isRequired,
  salarioBrutoPretendido: PropTypes.number,
  // eslint-disable-next-line react/forbid-prop-types
  actualizarSalario: PropTypes.bool.isRequired,
  onPostularHandler: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  componentId: PropTypes.string.isRequired,
  callback: PropTypes.func,
}

Preguntas.defaultProps = {
  salarioBrutoPretendido: null,
  callback: undefined,
}
