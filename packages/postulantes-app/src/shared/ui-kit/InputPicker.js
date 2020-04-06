/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/prefer-default-export */
import React, { Component } from 'react'

import { StyleSheet } from 'react-native'
import { Content, Form, Item, Picker, Icon } from 'native-base'

// eslint-disable-next-line no-unused-vars
const styles = StyleSheet.create({
  button: {
    /* backgroundColor: '#fff', */
    alignSelf: 'center',
    marginTop: 0,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 5,
    paddingTop: 5,
    borderRadius: 2,
    height: 30,
    fontSize: 16,
    color: '#666',
  },
})
export default class InputPicker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected2: undefined,
    }
  }

  onValueChange2(value) {
    this.setState({
      selected2: value,
    })
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { mode, placeholder } = this.props
    return (
      <Content>
        <Form>
          <Item picker Icon>
            <Picker
              mode={mode}
              iosIcon={<Icon name="arrow-down" />}
              style={styles.button}
              placeholder={placeholder}
              placeholderStyle={{ color: '#bfc6ea' }}
              placeholderIconColor="#bfc6ea"
              selectedValue={this.state.selected2}
              onValueChange={this.onValueChange2.bind(this)}
            >
              <Picker.Item label="Todas mis postulaciones" value="key0" />
              <Picker.Item label="Envidadas" value="key1" />
              <Picker.Item label="Leídas" value="key3" />
              <Picker.Item label="Contactadas" value="key4" />
            </Picker>
          </Item>
        </Form>
      </Content>
    )
  }
}
