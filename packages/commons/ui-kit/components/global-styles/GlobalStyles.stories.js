/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'

import { GlobalStyles } from './GlobalStyles'

const stories = storiesOf('Global Styles', module)

stories.addDecorator(withKnobs)

stories.add('Styles', () => <GlobalStyles />)
