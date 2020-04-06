/* eslint-disable react/no-unused-state */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/sort-comp */
import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { Icon } from '.'
import DefaultTheme from '../../themes/DefaultTheme'

const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderBottomWidth: 0,
  },
  title: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#000',
    position: 'absolute',
    left: 45,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 35,
    paddingLeft: 25,
    paddingRight: 18,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
  },
  parentHr: {
    height: 1,
    color: '#000',
    width: '100%',
  },
  child: {
    backgroundColor: '#fff',
    padding: 5,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
})

export default class Accordian extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: props.data,
      expanded: false,
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.row, this.state.expanded && { borderBottomRightRadius: 0, borderBottomLeftRadius: 0 }]}
          onPress={() => this.toggleExpand()}
        >
          <Icon name="Options-2" size={20} color={DefaultTheme.colors.primary} style={{ marginLeft: -10 }} />
          <Text style={[styles.title, styles.font]}>{this.props.title}</Text>
          <Icon
            name={this.state.expanded ? 'Arrow-triangle-up' : 'Arrow-triangle-down'}
            color={DefaultTheme.colors.primary}
            size={20}
          />
        </TouchableOpacity>
        <View style={styles.parentHr} />
        {this.state.expanded && (
          <View style={styles.child}>
            <this.props.data />
          </View>
        )}
      </View>
    )
  }

  toggleExpand = () => {
    // eslint-disable-next-line react/no-access-state-in-setstate
    this.setState({ expanded: !this.state.expanded })
  }
}
