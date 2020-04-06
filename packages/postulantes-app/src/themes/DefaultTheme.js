import color from 'color'
import { black, white, blue, ultraLightBlue, whatsAppGreen, green, transparent } from './colors'

/**
 * Colors:
 *   primary - primary color for your app, usually your brand color.
 *   accent - secondary color for your app which complements the primary color.
 *   background - background color for pages, such as lists.
 *   surface - background color for elements containing content, such as cards.
 *   text - text color for content.
 *   disabled - color for disabled elements.
 *   placeholder - color for placeholder text, such as input placeholder.
 *   backdrop - color for backdrops of various components such as modals.
 */

const DefaultTheme = Object.freeze({
  colors: {
    primary: '#329af0', // '#3D47F5',
    secondary: '#51cf66', // #E90066',
    accent: white,
    background: '#EDF1F7',
    white: '#fff',
    surface: white,
    transparent,
    error: '#FB2323',
    success: green,
    whatsApp: whatsAppGreen,
    disabledPrimary: color('#329af0')
      .alpha(0.1)
      .rgb()
      .string(),
    primaryText: color('#000018')
      .alpha(0.84)
      .rgb()
      .string(),
    secondaryText: color('#000018')
      .alpha(0.72)
      .rgb()
      .string(),
    tertiaryText: color('#000018')
      .alpha(0.36)
      .rgb()
      .string(),
    fourthText: color('#000018')
      .alpha(0.48)
      .rgb()
      .string(),
    textOverPrimary: white,
    labelText: color('#000018')
      .alpha(0.6)
      .rgb()
      .string(),
    shadow: 'rgba(0, 0, 0, 0.16)',
    border: color('#000018')
      .alpha(0.16)
      .rgb()
      .string(),
    bottomTabDisabled: 'rgba(255, 255, 255, 0.6)',
    separator: 'rgba(36, 40, 44, 0.16)',
    lightPrimary: color('#329af0')
      .alpha(0.52)
      .rgb()
      .string(),
    disabledText: color(black)
      .alpha(0.4)
      .rgb()
      .string(),
    disabledBackground: '#C3C2C8',
    placeholder: color(black)
      .alpha(0.28)
      .rgb()
      .string(),
    backdrop: color(black)
      .alpha(0.75)
      .rgb()
      .string(),
    notification: blue,
    requestedContact: ultraLightBlue,
  },
  errrorMenssage: {
    fontSize: 11,
    color: 'red',
    marginVertical: 5,
    paddingLeft: 15,
  },
})

export default DefaultTheme
