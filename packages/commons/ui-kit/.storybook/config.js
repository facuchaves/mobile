import { configure, addDecorator } from '@storybook/react'
import { withPortalTheme } from '../themes/storybook-addon'

// automatically import all files ending in *.stories.js
const req = require.context('../components', true, /\.stories\.js$/)

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

// TODO: no encontré una manera de setear un provider a toda la app de Storybook
//   Por ahora queda cada story wrappeada con el Theme
addDecorator(withPortalTheme())

configure(loadStories, module)
