/* eslint-disable react/prop-types */
// IMPORTS
import React, { useState } from 'react'
import { Content, Card, CardItem, Text, Body, Right, Toast } from 'native-base'
import { StyleSheet, Dimensions } from 'react-native'
import * as yup from 'yup'
import { Formik } from 'formik'
import i18n from '../../../i18n'

import ThrottledTouchableOpacity from '../../../components/commons/ThrottledTouchableOpacity'

import CurriculumService from '../../../api/curriculum-services'
// UI-KIT
import { Icon, Modal, TextArea, ButtonUi } from '../../../shared/ui-kit'

// THEME
import DefaultTheme from '../../../themes/DefaultTheme'

const { width } = Dimensions.get('screen')

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
  datoDefault: {
    color: '#666',
    fontWeight: 'normal',
    fontSize: 14,
  },
  label: {
    fontSize: 12,
    margin: 3,
    marginLeft: 0,
    marginTop: 1,
    color: '#bdbdbd',
  },
  textarea: {
    width: width * 0.85,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  textCount: {
    fontSize: 11,
    color: '#ccc',
    alignSelf: 'flex-end',
    margin: 3,
  },
  errrorMenssage: {
    fontSize: 11,
    color: 'red',
    margin: 10,
    marginTop: 3,
    paddingLeft: 5,
  },
})

const ObjetivoLaboral = props => {
  const { objetivo, updateCv } = props
  const [Page, setPage] = useState({
    editObjetivo: false,
  })

  const isInitialValid = (validationSchema, initialValues) => {
    if (!validationSchema) return true
    return validationSchema.isValidSync(initialValues)
  }

  const initialValues = { objetivo }
  const validationSchema = yup.object().shape({
    objetivo: yup
      .string()
      .max(250)
      .required(i18n.t('validation:error_objetivo_laboral'))
      .nullable(i18n.t('validation:error_objetivo_laboral')),
  })

  if (!Page.editObjetivo) {
    return (
      <Content padder style={styles.container}>
        <Card style={styles.box}>
          <CardItem header style={styles.containerTitulo}>
            <Body>
              <Text style={styles.titulo}>{i18n.t('curriculum:objetivo:title')}</Text>
            </Body>
            <Right>
              <ThrottledTouchableOpacity
                onPress={() => {
                  // eslint-disable-next-line no-console
                  setPage({ ...Page, editObjetivo: true })
                }}
              >
                <Icon name="Edit-1" color={DefaultTheme.colors.primary} size={25} style={{ marginTop: 0 }} />
              </ThrottledTouchableOpacity>
            </Right>
          </CardItem>
          <CardItem style={styles.box}>
            <Body>
              <Text style={styles.defaultText}>{objetivo || i18n.t('curriculum:objetivo:empty')}</Text>
            </Body>
          </CardItem>
        </Card>
      </Content>
    )
  }

  return (
    <Content padder style={styles.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={async values => {
          const responseError = await updateCv(CurriculumService.guardarObjetivo(values))
          if (!responseError) {
            // si respondieron error no sacamos el form
            setPage({ ...Page, editObjetivo: false })
          }
        }}
        validationSchema={validationSchema}
        isInitialValid={isInitialValid(validationSchema, initialValues)}
      >
        {({ values, setFieldValue, errors, setFieldTouched, isValid, touched, handleSubmit }) => (
          <Card style={styles.box}>
            <CardItem header bordered style={styles.containerTitulo}>
              <Body>
                <Text style={styles.titulo}>{i18n.t('curriculum:objetivo:title')}</Text>
              </Body>
              <Right>
                <ThrottledTouchableOpacity
                  onPress={() => {
                    setPage({ ...Page, editObjetivo: false })
                  }}
                >
                  <Icon name="Close" color={DefaultTheme.colors.primaryText} size={28} style={{ marginTop: 0 }} />
                </ThrottledTouchableOpacity>
              </Right>
            </CardItem>
            <CardItem style={styles.box}>
              <TextArea
                label={i18n.t('curriculum:objetivo:title_edit')}
                rowSpan={5}
                bordered={false}
                maxLength={250}
                value={values.objetivo ? String(values.objetivo) : ''}
                onChangeText={itemValue => {
                  setFieldValue('objetivo', itemValue)
                }}
                setFieldTouched={() => setFieldTouched('objetivo')}
                styles={{}}
              />
            </CardItem>
            {/* ERRROR MENSSAGE */}
            {touched.objetivo && errors.objetivo && <Text style={styles.errrorMenssage}>{errors.objetivo}</Text>}

            <ButtonUi
              success
              text={i18n.t('button:button_create')}
              disabled={!isValid}
              onPress={handleSubmit}
              styles={{ button: { marginHorizontal: 16, marginBottom: 14 } }}
            />
            <ButtonUi
              transparent
              text={i18n.t('button:button_delete')}
              styles={{ text: { color: 'red' } }}
              onPress={() => {
                Modal(
                  null,
                  i18n.t('curriculum:objetivo:warning'),
                  i18n.t('button:no'),
                  null,
                  i18n.t('button:si'),
                  () => {
                    CurriculumService.borrarObjetivo().then(response => {
                      const hasError = response.status === 500
                      if (hasError) {
                        Toast.show({
                          text: i18n.t('validation:error_request'),
                          buttonText: 'Okay',
                          duration: 10000,
                          type: 'danger',
                          position: 'bottom',
                        })
                      }

                      if (!hasError) {
                        setPage({ ...Page, editObjetivo: false })
                        updateCv()
                      }
                    })
                  }
                )
              }}
            />
          </Card>
        )}
      </Formik>
    </Content>
  )
}

export default ObjetivoLaboral
