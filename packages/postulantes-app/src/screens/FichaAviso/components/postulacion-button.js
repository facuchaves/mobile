// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'
import i18n from '../../../i18n'
import { ButtonUi, Icon } from '../../../shared/ui-kit'
// import CuentaService from '../../../api/cuenta-service'
// import CurriculumService from '../../../api/curriculum-services'
// THEME
import DefaultTheme from '../../../themes/DefaultTheme'

const MessageBox = ({ mensaje }) => {
  return (
    <View style={{ paddingVertical: 10, alignItems: 'center' }}>
      <Icon name="Alert-triangle" size={28} color={DefaultTheme.colors.secondary} />
      <Text style={{ fontWeight: 'bold', paddingVertical: 5 }}>{i18n.t('ficha_aviso:potulacion_espera')}</Text>
      <Text style={{ textAlign: 'center' }}>{mensaje}</Text>
    </View>
  )
}

export const PostularButton = ({ postulado, postulacion, handleSubmit, isValid }) => {
  // eslint-disable-next-line no-unused-vars
  const [infoEspera, setInfoEspera] = useState(null)

  const postulacionEstaRealizada =
    postulado && postulacion && postulacion.estado && postulacion.estado.toLowerCase() === 'realizada'

  // eslint-disable-next-line no-unused-vars
  const infoEmailNoValidado = {
    component: <MessageBox mensaje="Activá tu cuenta desde tu email para que enviemos la postulación." />,
    buttonName: 'Reenviar correo',
    handleSubmit: () => {
      // TODO Reenviar el correo
      setInfoEspera({
        component: <MessageBox mensaje="Activá tu cuenta desde tu email para que enviemos la postulación." />,
        buttonName: 'Correo enviado',
        handleSubmit: undefined,
        disabled: true,
      })
    },
  }

  // eslint-disable-next-line no-unused-vars
  const infoCVNoCompleto = {
    component: <MessageBox mensaje="Completá tu CV para que la enviemos." />,
    buttonName: 'Ir a Mi CV',
    handleSubmit: () => {},
    disabled: true,
  }

  //   useEffect(() => {
  //     if (postulacionEstaRealizada) return
  //     const fetchEsperaInfo = async () => {
  //       const datosDeCuenta = await CuentaService.getCuenta()
  //       if (datosDeCuenta && !datosDeCuenta.mailValidado) {
  //         setInfoEspera(infoEmailNoValidado)
  //         // return
  //       }
  //       //   const datosCV = await CurriculumService.getCurriculum()
  //       //   if (datosCV && datosCV.curriculum && !datosCV.curriculum.id) {
  //       //     setInfoEspera(infoCVNoCompleto)
  //       //   }
  //     }
  //     fetchEsperaInfo()
  //   }, [postulado])

  if (!postulado)
    return (
      <ButtonUi
        text={`${i18n.t('ficha_aviso:button_postularme')}`}
        onPress={handleSubmit}
        disabled={!!postulado || !isValid}
      />
    )

  if (postulacionEstaRealizada)
    return (
      <>
        <ButtonUi
          text={`${i18n.t('ficha_aviso:button_postulado')(postulado)}`}
          disabled
          transparent
          styles={{ button: { backgroundColor: '#C3C2C8' }, text: { color: 'white' } }}
        />
      </>
    )

  // if (!infoEspera)
  return (
    <>
      <MessageBox mensaje={i18n.t('ficha_aviso:activa_mail_o_completa_cv')} />
      <ButtonUi
        text={i18n.t('ficha_aviso:boton_postulacion_en_espera')}
        disabled
        transparent
        styles={{ button: { backgroundColor: '#C3C2C8' }, text: { color: 'white' } }}
      />
    </>
  )

  //   return (
  //     <>
  //       {infoEspera.component}
  //       <ButtonUi text={infoEspera.buttonName} onPress={infoEspera.handleSubmit} disabled={infoEspera.disabled} />
  //     </>
  //   )
}

MessageBox.propTypes = {
  mensaje: PropTypes.string.isRequired,
}

PostularButton.propTypes = {
  postulado: PropTypes.bool.isRequired,
  postulacion: PropTypes.shape({
    estado: PropTypes.string,
    fecha: PropTypes.string,
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isValid: PropTypes.bool.isRequired,
}
