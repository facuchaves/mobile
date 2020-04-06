import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { Form, Toast } from 'native-base'
import { Formik } from 'formik'
import moment from 'moment'
import * as yup from 'yup'
import i18n from '../../../i18n'
import ScreenIds from '../../../constants/ScreenIds'
import { showModal } from '../../../navigation/helpers'
import CheckBoxItem from '../../../shared/ui-kit/checkbox'
import { vw } from '../../../style/helpers'
import { InputUi } from '../../../shared/ui-kit'
import Request, { Post } from '../../../hooks/api/restClient'
// THEME
import DefaultTheme from '../../../themes/DefaultTheme'
import { PostularButton } from './postulacion-button'

const styles = StyleSheet.create({
  container: {
    backgroundColor: DefaultTheme.colors.white,
    borderRadius: 8,
    margin: 16,
    padding: 16,
    paddingTop: 0,
  },
  item: {
    marginLeft: 5,
  },
  label: {
    fontSize: 16,
    color: DefaultTheme.colors.tertiaryText,
    lineHeight: 20,
  },
  input: {
    width: vw(310),
  },
  buttonPostulacion: {
    margin: 10,
  },
  buttonPostulacionText: {
    color: '#FFF',
    textAlign: 'center',
  },
})

export const Postulacion = props => {
  const { aviso, postulacion, reloadData } = props
  const { preguntas } = aviso
  const [postulado, setPostulado] = useState(!!postulacion && postulacion.fecha)

  useEffect(() => {
    const init = () => {
      setPostulado(!!postulacion && postulacion.fecha)
    }
    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postulacion])

  // eslint-disable-next-line no-unused-vars
  const [idPostulacion, setIdPostulacion] = useState(null)

  // eslint-disable-next-line no-unused-vars
  const cartaPresentacion = ({
    // eslint-disable-next-line no-shadow
    idPostulacion,
    Aviso,
  }) => {
    showModal(ScreenIds.CARTA_PRESENTACION, {
      idPostulacion,
      Aviso,
    })
  }

  const postularFetch = ({ idAviso, salarioBrutoPretendido, actualizarSalario, respuestas = [], callback } = {}) => {
    // console.log('POSTULAR FETCH: ', { idAviso, salarioBrutoPretendido, actualizarSalario, respuestas })
    const fetchData = async () => {
      try {
        const request = new Request()
        request.path = `/candidates/aviso/${idAviso}/postular`
        request.body = {
          respuestas,
          salarioPretendido: salarioBrutoPretendido || null,
          actualizarSalario,
          // origenId: 0,
        }
        request.method = Post

        const response = await request.call()

        setPostulado(moment().format('DD-MM-YYYY'))
        setIdPostulacion(response.id)
        // eslint-disable-next-line no-console
        if (callback) callback()
        cartaPresentacion({ idPostulacion: response.id, Aviso: aviso })
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log({ error: e.response.data.message || 'Error al Postular' })
        Toast.show({
          text: e.response.data.message,
          buttonText: 'Ok',
          duration: 10000,
          type: 'danger',
          position: 'bottom',
        })
      }
    }
    fetchData()
  }

  const generateValidationScheme = ({ salario }) => {
    const shape = {}
    if (salario) shape.salario = yup.string().required(`salario`)
    return yup.object().shape(shape)
  }

  const formikSubmit = values => {
    if (!preguntas || !preguntas.length)
      postularFetch({
        idAviso: aviso.id,
        salarioBrutoPretendido: !values.salario ? null : values.salario,
        actualizarSalario: values.actSalario,
        respuestas: [],
        callback: reloadData,
      })
    else {
      showModal(ScreenIds.PREGUNTAS, {
        idAviso: aviso.id,
        salarioBrutoPretendido: !values.salario ? null : values.salario,
        actualizarSalario: values.actSalario,
        preguntas,
        callback: reloadData,
        onPostularHandler: postularFetch,
      })
    }
  }

  const isInitialValid = (validationSchema, initialValues) => {
    if (!validationSchema) return true
    return validationSchema.isValidSync(initialValues)
  }
  const initialValuesForm = { salario: null, actSalario: false }
  const salarioRequerido = !!(aviso && aviso.requisitos && aviso.requisitos.salario)
  const validationSchema = generateValidationScheme({ salario: salarioRequerido })

  return (
    <>
      {/* COMPONENTE POSTULACION */}

      <View style={styles.container}>
        <Formik
          initialValues={initialValuesForm}
          validationSchema={validationSchema}
          onSubmit={formikSubmit}
          isInitialValid={isInitialValid(validationSchema, initialValuesForm)}
        >
          {({ values, setFieldValue, handleSubmit, setFieldTouched, isValid /* errors */ }) => (
            <>
              {!postulado ? (
                <Form style={styles.form}>
                  <InputUi
                    placeholder={i18n.t('ficha_aviso:label_salario')}
                    required={salarioRequerido}
                    transparent
                    value={values.salario}
                    setFieldValue={itemValue => {
                      setFieldValue('salario', itemValue)
                    }}
                    setFieldTouched={() => setFieldTouched('salario')}
                    autoCompleteType="cc-number"
                    keyboardType="numeric"
                    styles={{ inputs: { minWidth: vw(320) } }}
                  />
                  <CheckBoxItem
                    style={{ borderBottomWidth: 0, marginLeft: 0, textAlign: 'left' }}
                    text={i18n.t('ficha_aviso:label_check_salario')}
                    value={null}
                    handleChange={() => setFieldValue('actSalario', !values.actSalario)}
                    checked={values.actSalario}
                  />
                </Form>
              ) : null}
              {/* BUTTON PUSTULARSE */}
              <View style={{ paddingTop: 10 }}>
                <PostularButton {...{ postulado, postulacion, isValid, handleSubmit }} />
              </View>
            </>
          )}
        </Formik>
      </View>
    </>
  )
}

const EmpresaPropType = PropTypes.shape({
  denominacion: PropTypes.string.isRequired,
  logoURL: PropTypes.string,
  confidencial: PropTypes.bool,
  id: PropTypes.number,
})

const LocalizacionPropType = PropTypes.shape({
  direccion: PropTypes.string,
  detalle: PropTypes.string,
})

const AreaPropType = PropTypes.shape({
  nombre: PropTypes.string,
  detalle: PropTypes.string,
})

const TipoTrabajoPropType = PropTypes.shape({
  nombre: PropTypes.string,
})

export const AvisoPropType = PropTypes.shape({
  titulo: PropTypes.string.isRequired,
  descripcion: PropTypes.string,
  empresa: EmpresaPropType.isRequired,
  localizacion: LocalizacionPropType,
  area: AreaPropType,
  tipoTrabajo: TipoTrabajoPropType,
})

Postulacion.propTypes = {
  aviso: AvisoPropType,
  postulacion: PropTypes.shape({
    fecha: PropTypes.string,
    estado: PropTypes.string,
  }),
  reloadData: PropTypes.func,
}

Postulacion.defaultProps = {
  aviso: null,
  postulacion: { fecha: null, estado: null },
  reloadData: undefined,
}
