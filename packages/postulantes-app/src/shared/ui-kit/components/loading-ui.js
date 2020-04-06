import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import PropTypes from 'prop-types'
import Placeholder from 'rn-placeholder'
import DefaultTheme from '../../../themes/DefaultTheme'

export const Loading = {}

Loading.loader = message => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: DefaultTheme.colors.background,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {message ? <Text style={{ marginBottom: 100 }}>{message}</Text> : null}
      <ActivityIndicator size={20} color={DefaultTheme.colors.primary} />
    </View>
  )
}

Loading.loaderForElement = () => {
  return <ActivityIndicator size={20} color={DefaultTheme.colors.primary} style={{ marginTop: 50 }} />
}

Loading.cards = ({ isReady, itemSize, size }) => {
  return (
    <View>
      <Placeholder.ImageContent
        size={size}
        animate="fade"
        lineNumber={itemSize}
        lineSpacing={5}
        lastLineWidth="30%"
        onReady={isReady}
      >
        <Text>Placeholder has finished :D</Text>
      </Placeholder.ImageContent>
    </View>
  )
}

Loading.cards.propTypes = {
  isReady: PropTypes.bool.isRequired,
  size: PropTypes.number,
  itemSize: PropTypes.number,
}

Loading.cards.defaultProps = {
  size: 60,
  itemSize: 10,
}

export default Loading
