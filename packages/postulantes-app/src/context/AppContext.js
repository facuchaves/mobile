import React from 'react'
import { Root, StyleProvider } from 'native-base'

// THEME
import getTheme from '../themes/components'
// THEME
import material from '../themes/variables/material'
// contexts imports

// create context app
const AppContext = React.createContext()

// eslint-disable-next-line react/prop-types
export const AppProvider = ({ children }) => {
  return (
    <AppContext.Provider value={{ usuario: null }}>
      <Root>
        <StyleProvider style={getTheme(material)}>{children}</StyleProvider>
      </Root>
    </AppContext.Provider>
  )
}

export default AppContext
