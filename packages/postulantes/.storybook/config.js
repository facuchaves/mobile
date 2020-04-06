import requireContext from 'require-context.macro'
import { configure, addDecorator } from '@storybook/react'
import { withPortalTheme } from '@navent-jobs/ui-kit/themes/storybook-addon'

import moment from 'moment'
import 'moment/locale/es'
moment.locale('es')

// automatically import all files ending in *.stories.js
const req = requireContext('../src/components', true, /\.stories\.js$/)

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

addDecorator(withPortalTheme())

configure(loadStories, module)
