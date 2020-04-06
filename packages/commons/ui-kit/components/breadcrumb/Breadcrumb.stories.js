import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { Breadcrumb } from './index'

const links = [{ title: 'Link Uno', link: '#' }, { title: 'Link Dos', link: '#' }]

storiesOf('Breadcrumb', module)
  .add('with just previous links', () => <Breadcrumb links={links} />)
  .add('with back link', () => <Breadcrumb links={links} onBackLinkClick={action('back-link-click')} />)
  .add('with current title', () => <Breadcrumb links={links} currentTitle="Actual" />)
  .add('with back link and current title', () => (
    <Breadcrumb links={links} currentTitle="Sección Actual" onBackLinkClick={action('back-link-click')} />
  ))
