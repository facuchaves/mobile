/* eslint-disable react/no-unused-state */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import { List, ListItem, Text, Radio, Body } from 'native-base'

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  radioText: {
    fontSize: 12,
    color: '#666',
  },
  radio: {
    paddingLeft: 3,
  },
})

export default class RadioButton extends Component {
  constructor() {
    super()
    this.state = {
      data: [],
      // eslint-disable-next-line react/no-unused-state
      pressed: true,
      value: '',
    }
  }

  onCheckBoxPress(ev, action) {
    if (this.state.value === ev) {
      this.setState({ value: {} })
      return
    }
    this.setState({ value: ev }, () => {
      action(ev.name)
    })
  }

  render() {
    const { data, action } = this.props
    return (
      <List style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {data.map((value, index) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <ListItem style={{ margin: 0, width: width / 2.5, borderBottomWidth: 0 }} key={index}>
              <Body style={{ borderBottomWidth: 0, flexDirection: 'row', flexWrap: 'wrap' }}>
                <Radio
                  style={styles.radio}
                  color="#666"
                  selectedColor="#5cb85c"
                  radioBtnSize={2}
                  onPress={this.onCheckBoxPress.bind(this, value, action)}
                  // eslint-disable-next-line eqeqeq
                  selected={this.state.value == value}
                />
                <Text style={styles.radioText}>{value.name}</Text>
              </Body>
            </ListItem>
          )
        })}
      </List>
    )
  }
}
