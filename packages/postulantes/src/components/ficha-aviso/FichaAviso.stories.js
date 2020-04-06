import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { FichaAviso } from './index'
import { fichaAvisoSinSalario, fichaAvisoConSalario } from './__mocks__'

export const withContainer = () => story => {
  return <div style={{ padding: 20, backgroundColor: '#f5f5f5' }}>{story()}</div>
}

storiesOf('FichaAviso', module)
  .addDecorator(withContainer())
  .add('sin salario', () => (
    <FichaAviso aviso={fichaAvisoSinSalario} {...fichaAvisoSinSalario} onPostularClick={action('on-postular-click')} />
  ))
  .add('con salario', () => (
    <FichaAviso aviso={fichaAvisoConSalario} {...fichaAvisoConSalario} onPostularClick={action('on-postular-click')} />
  ))
