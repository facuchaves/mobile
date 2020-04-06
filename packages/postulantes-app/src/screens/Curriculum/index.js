/* eslint-disable no-console */
/* eslint-disable global-require */
// IMPORTS
import React, { useState, useEffect } from 'react'
import { Animated, Dimensions, View, ScrollView, StyleSheet } from 'react-native'
import { ScrollableTab, Tab, TabHeading, Tabs, Container } from 'native-base'
import OnLayout from 'react-native-on-layout'
import { useNavigationComponentDidAppear } from 'react-native-navigation-hooks'
import ThrottledTouchableOpacity from '../../components/commons/ThrottledTouchableOpacity'
import i18n from '../../i18n'

import { showModal } from '../../navigation/helpers'
// SERVICES
import CurriculumService from '../../api/curriculum-services'

// THEME
import DefaultTheme from '../../themes/DefaultTheme'

// COMPONENTS
import { Loading } from '../../shared/ui-kit'
import HeaderBasic from '../../shared/ui-kit/HeaderBasic'
import DatosPersonales from './components/datos-personales'
import DatosContacto from './components/datos-contacto'
import PreferenciaSalarial from './components/preferencia-salarial'
import ObjetivoLaboral from './components/objetivo-laboral'
import VideoCvRedirect from './components/video-redirect'
import ReferenciasLaborales from './components/referencias-laborales'
import ReferenciasEstudio from './components/referencias-estudio'
import ExperienciaLaborales from './components/experiencia-laboral'
import ExperienciaEducativa from './components/experiencia-educativa'
import Idiomas from './components/educacion-idiomas'
import Skills from './components/educacion-skills'
import Pda from './components/pda'

// const styles = StyleSheet.create({})
const { width: SCREEN_WIDTH, fontScale } = Dimensions.get('window')
const IMAGE_HEIGHT = 252
const HEADER_HEIGHT = 75
const SCROLL_HEIGHT = IMAGE_HEIGHT - HEADER_HEIGHT
const THEME_COLOR = DefaultTheme.colors.primary
const FADED_THEME_COLOR = DefaultTheme.colors.white

const styles = StyleSheet.create({
  container: {
    backgroundColor: DefaultTheme.colors.background,
  },
})
const CurriculumScreen = ({ componentId }) => {
  const nScroll = new Animated.Value(0)
  // eslint-disable-next-line lines-between-class-members
  const scroll = new Animated.Value(0)

  const textColor = scroll.interpolate({
    inputRange: [0, SCROLL_HEIGHT / 5, SCROLL_HEIGHT],
    outputRange: [THEME_COLOR, FADED_THEME_COLOR, 'white'],
    extrapolate: 'clamp',
  })

  const tabBg = scroll.interpolate({
    inputRange: [0, SCROLL_HEIGHT],
    outputRange: ['white', THEME_COLOR],
    extrapolate: 'clamp',
  })

  const tabY = nScroll.interpolate({
    inputRange: [0, SCROLL_HEIGHT, SCROLL_HEIGHT + 1],
    outputRange: [0, 0, 1],
  })

  const headerBg = scroll.interpolate({
    inputRange: [0, SCROLL_HEIGHT, SCROLL_HEIGHT + 1],
    outputRange: ['transparent', 'transparent', THEME_COLOR],
    extrapolate: 'clamp',
  })

  const imgScale = nScroll.interpolate({
    inputRange: [-25, 0],
    outputRange: [1.1, 1],
    extrapolateRight: 'clamp',
  })

  // STATES
  const [Cv, setCv] = useState([])

  const [Page, setPage] = useState({
    activeTab: 0,
    isLoading: true,
    heights: { tab0: null, tab1: null, tab2: null },
  })

  const detectTabHeight = tabActual => {
    const nameTabActive = `tab${Page.activeTab}`

    const stylesHeight =
      Page.activeTab === tabActual ? { minHeight: null } : { height: Page.heights[nameTabActive] || null }

    return stylesHeight
  }

  const getHeightToTab = (heightElement, tab) => {
    const heightToSave = Page.heights[tab] <= 0 ? Math.round(heightElement) : Page.heights[tab]
    Page.heights[tab] = heightToSave
  }
  const getCurriculum = async () => {
    const Curriculum = await CurriculumService.getCurriculum()
    setCv(Curriculum)
    setPage({ ...Page, isLoading: false })
  }

  const updateCv = async action => {
    // Reseteo el height del tab actual para recalcularlo
    if (Page.activeTab) {
      Page.heights[`tab${Page.activeTab}`] = null
    }
    setPage({ ...Page, isLoading: true })
    let rs = null
    rs = await action

    setTimeout(() => {
      getCurriculum()
    }, 3000)

    return rs
  }

  useEffect(() => {
    nScroll.addListener(Animated.event([{ value: scroll }], { useNativeDriver: false }))
  })

  useNavigationComponentDidAppear(() => {
    getCurriculum()
  }, componentId)

  // CONTENIDO
  const collapsableComponent = <DatosPersonales data={Cv.datosPersonales} updateCv={() => updateCv()} />

  const tabDatosPersonales = () => {
    return (
      <View>
        <DatosContacto data={Cv.datosPersonales} updateCv={updateCv} />
        <VideoCvRedirect />
        <PreferenciaSalarial salario={Cv.curriculum.salarioPreferencia} updateCv={() => updateCv()} />
        <ObjetivoLaboral objetivo={Cv.curriculum.descripcion} updateCv={() => updateCv()} />
        <Pda tienePerfilPda={!!Cv.pda} resumenPda={Cv.pda ? Cv.pda.resumen : null} />
      </View>
    )
  }

  const tabDatosLaborales = () => {
    return (
      <View>
        <ExperienciaLaborales data={Cv.curriculum.experienciasLaborales} updateCv={() => updateCv()} />
        <ReferenciasLaborales
          data={Cv.curriculum.referencias}
          updateCv={() => updateCv()}
          habilitar={Cv.curriculum.experienciasLaborales ? Cv.curriculum.experienciasLaborales.length > 0 : false}
        />
      </View>
    )
  }

  const tabDatosEstudio = () => {
    return (
      <View>
        <ExperienciaEducativa data={Cv.curriculum.estudios} updateCv={() => updateCv()} />
        <ReferenciasEstudio
          data={Cv.curriculum.referencias}
          updateCv={() => updateCv()}
          habilitar={Cv.curriculum.estudios ? Cv.curriculum.estudios.length > 0 : false}
        />
        <Idiomas
          idiomas={Cv.curriculum.idiomas}
          updateCv={() => updateCv()}
          keysIdiomas={Cv.curriculum.idiomas ? Object.keys(Cv.curriculum.idiomas) : []}
        />
        {/* <Informatica data={Cv.curriculum.conocimientosNormalizados} /> */}
        <Skills data={Cv.curriculum.conocimientosDesnormalizados} updateCv={() => updateCv()} />
      </View>
    )
  }

  if (Cv.curriculum) {
    return (
      <Container style={styles.container}>
        <View>
          <Animated.View style={{ position: 'absolute', width: '100%', backgroundColor: headerBg, zIndex: 1 }}>
            <HeaderBasic
              iconRightText="Settings-2"
              iconRightAction={() => {
                showModal('AJUSTES', {
                  Cv,
                })
              }}
            />
          </Animated.View>
          {Page.isLoading ? (
            <Container style={{ position: 'absolute', zIndex: 1, width: '100%' }}>{Loading.loader()}</Container>
          ) : (
            <Animated.ScrollView
              scrollEventThrottle={5}
              showsVerticalScrollIndicator={false}
              onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: nScroll } } }], {
                useNativeDriver: true,
              })}
              style={{ zIndex: 0 }}
            >
              <Animated.View
                style={{
                  transform: [{ translateY: Animated.multiply(nScroll, 0.65) }, { scale: imgScale }],
                  backgroundColor: '#FFF',
                  marginTop: 50,
                  borderBottomWidth: 0,
                }}
              >
                {collapsableComponent}
              </Animated.View>
              <Tabs
                locked
                initialPage={Page.activeTab}
                prerenderingSiblingsNumber={3}
                onChangeTab={({ i }) => {
                  setPage({ ...Page, activeTab: i })
                }}
                renderTabBar={props => (
                  <Animated.View
                    style={{
                      transform: [{ translateY: tabY }],
                      zIndex: 1,
                      width: '100%',
                      backgroundColor: DefaultTheme.colors.background,
                    }}
                  >
                    <ScrollableTab
                      {...props}
                      renderTab={(name, page, active, onPress, onLayout) => (
                        <ThrottledTouchableOpacity
                          key={page}
                          onPress={() => onPress(page)}
                          onLayout={onLayout}
                          activeOpacity={0.4}
                        >
                          <Animated.View
                            style={{
                              flex: 1,
                              height: 75,
                              backgroundColor: tabBg,
                            }}
                          >
                            <TabHeading
                              style={{
                                backgroundColor: 'transparent',
                                width: SCREEN_WIDTH / 3,
                                height: 40,
                              }}
                              active={active}
                            >
                              <Animated.Text
                                style={{
                                  fontWeight: active ? '400' : 'normal',
                                  color: textColor,
                                  fontSize: 16 / fontScale,
                                  lineHeight: 20,
                                  paddingVertical: 10,
                                }}
                              >
                                {name}
                              </Animated.Text>
                            </TabHeading>
                          </Animated.View>
                        </ThrottledTouchableOpacity>
                      )}
                      underlineStyle={{ backgroundColor: JSON.stringify(textColor) }}
                    />
                  </Animated.View>
                )}
              >
                <Tab heading={i18n.t('curriculum:tabs:perfil')}>
                  <OnLayout>
                    {({ height }) => {
                      getHeightToTab(height, `tab${0}`)
                      return <ScrollView style={detectTabHeight(0)}>{tabDatosPersonales()}</ScrollView>
                    }}
                  </OnLayout>
                </Tab>
                <Tab heading={i18n.t('curriculum:tabs:experiencia')}>
                  <OnLayout>
                    {({ height }) => {
                      getHeightToTab(height, `tab${1}`)
                      return <ScrollView style={detectTabHeight(1)}>{tabDatosLaborales()}</ScrollView>
                    }}
                  </OnLayout>
                </Tab>
                <Tab heading={i18n.t('curriculum:tabs:educacion')}>
                  <OnLayout>
                    {({ height }) => {
                      getHeightToTab(height, `tab${2}`)
                      return <ScrollView style={detectTabHeight(2)}>{tabDatosEstudio()}</ScrollView>
                    }}
                  </OnLayout>
                </Tab>
              </Tabs>
            </Animated.ScrollView>
          )}
        </View>
      </Container>
    )
  }

  return Loading.loader('')
}

export default CurriculumScreen
