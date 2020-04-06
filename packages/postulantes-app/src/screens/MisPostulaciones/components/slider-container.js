import React from 'react'
import { StyleSheet } from 'react-native'
import { Content } from 'native-base'
// UI
// import { ButtonUi, SwitchUi } from '../../../shared/ui-kit'

import SlideDatos from './slide-datos'

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    borderWidth: 0,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 22,
  },
  body: {
    flex: 1,
    alignContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  textMedium: {
    color: '#666',
    fontSize: 12,
    marginRight: 10,
  },
  icon: {
    color: 'white',
    marginRight: 15,
    fontSize: 25,
  },
  buttonContent: { alignSelf: 'center' },
  button: {
    height: 40,
    alignSelf: 'center',
    marginTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  buttonText: {
    textTransform: 'uppercase',
    paddingLeft: 0,
  },

  footer: {
    backgroundColor: 'red',
    borderRadius: 8,
  },
})

const SliderContainer = props => {
  // eslint-disable-next-line react/prop-types
  const { filters } = props
  // Codigo comenta se usa en un proximo spring
  /*   
  const [switchValue, setSwitchValue] = useState(false)

  const toggleSwitch = value => {
    setSwitchValue(value)
  }
 */
  return (
    <Content style={styles.container}>
      {
        // Codigo comenta se usa en un proximo spring
        /*    <CardItem>
            <Body>
              <View style={styles.body}>
                <Text style={styles.textMedium}>{<Translate message="mis-postulaciones-titulo" />}</Text>

                <SwitchUi
                  onValueChange={this.toggleSwitch}
                  value={this.state.switchValue}
                  textlabel={null}
                  onColor={DefaultTheme.colors.primary}
                  offColor="#ccc"
                  stylesLabel={null}
                  buttonSize="small"
                />
              </View>
              <View style={styles.buttonContent}>
                <ButtonUi
                  iconLeft="bell"
                  text={<Translate message="mis-postulaciones-gestion-alertas" />}
                  styles={{ icon: styles.icon, button: styles.button }}
                  onPress={() => {}}
                />
              </View>
            </Body>
          </CardItem> */
      }

      <SlideDatos data={filters} />
    </Content>
  )
}

export default SliderContainer
