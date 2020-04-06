/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/forbid-prop-types */
import React, { Component, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import addons from '@storybook/addons'

import { themes, PortalTheme } from '.'
import { Button } from '../components'

const ADDON_ID = '@navent/ui-kit-theme'
const PANEL_ID = `${ADDON_ID}/panel`
const THEME_CHANGED = `${ADDON_ID}/theme-changed`

/**
 * `ThemePanel` es el componente encargado de mostrar los themes y dejar seleccionarlos
 * Es agregado como panel en StoryBook al registrar el addon
 */
class ThemePanel extends Component {
  selectTheme = themeId => {
    const { api } = this.props
    api.getChannel().emit(THEME_CHANGED, { themeId })
  }

  render() {
    const { active } = this.props
    if (!active) {
      return null
    }

    return (
      <div style={{ padding: 10 }}>
        {Object.keys(themes).map(themeId => (
          <PortalTheme portal={themeId} key={themeId}>
            <Button key={themeId} variant="primary" onClick={() => this.selectTheme(themeId)}>
              {themeId}
            </Button>
          </PortalTheme>
        ))}
      </div>
    )
  }
}

ThemePanel.propTypes = {
  api: PropTypes.any.isRequired,
  active: PropTypes.bool.isRequired,
}

/**
 * `WithPortalTheme` es el componente encargado de escuchar el evento de cambio de tema
 * y reaccionar ante el mismo. (usa hooks)
 * Wrappea la story con el `PortalTheme` usando el `theme` que corresponda
 */
const WithPortalTheme = ({ story, context }) => {
  const [portal, setPortal] = useState(process.env.STORYBOOK_PORTAL || 'bumeran')

  useEffect(() => {
    const handleThemeChange = ({ themeId }) => setPortal(themeId)
    addons.getChannel().on(THEME_CHANGED, handleThemeChange)

    return () => addons.getChannel().removeListener(THEME_CHANGED, handleThemeChange)
  }, [portal])

  return <PortalTheme portal={portal}>{story(context)}</PortalTheme>
}

WithPortalTheme.propTypes = {
  story: PropTypes.func.isRequired,
  context: PropTypes.object,
}

WithPortalTheme.defaultProps = {
  context: null,
}

/**
 * `withPortalTheme` es el _decorator_ que exponemos para registrar en StoryBook
 */
export const withPortalTheme = () => (story, context) => {
  return <WithPortalTheme story={story} context={context} />
}

addons.register(ADDON_ID, api => {
  // eslint-disable-next-line react/prop-types
  const render = ({ active }) => <ThemePanel api={api} active={active} />
  const title = 'Themes'

  addons.addPanel(PANEL_ID, {
    title,
    render,
  })
})
