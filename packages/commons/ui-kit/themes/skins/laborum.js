/* eslint-disable */

import { darken, lighten } from '../../helpers'

/**
 *  Constants
 */

const darkenValue = 10
const lightenValue = 10

/**
 *  Typography
 */

const fontSizeBase = 14

const fontFamilyPrimary = `"Open Sans"`
const fontFamilyPrimaryImport = 'https://fonts.googleapis.com/css?family=Open+Sans'

const fontFamilySecondary = `"Helvetica Neue", Helvetica, Arial, sans-serif;`
const fontFamilySecondaryImport = 'https://fonts.googleapis.com/css?family=Open+Sans'

const fontFamilyBase = fontFamilyPrimary

/**
 *  Colors
 */

// Brand colors for use across portal.
const brandPrimary = `#EB0064`
const brandSecondary = `#000DF1`
const brandTertiary = `#259DD5`

const success = `#51CF66`
const info = `#259DD5`
const warning = `#FAB005`
const danger = `#C92A2A`
const link = `#E4151A`
const simple = `#808080`

// Background color for `<body>`.
const bodyBg = `transparent`

// Background color for `<html>`.
const htmlBg = `transparent`

// Global text color on `<body>`.
const textColor = `#212121`

const bumeranSkin = {
  portal: 'laborum',
  colors: {
    primary: {
      normal: brandPrimary,
      lighten: lighten(brandPrimary, lightenValue),
      darken: darken(brandPrimary, darkenValue),
    },
    secondary: {
      normal: brandSecondary,
      lighten: lighten(brandSecondary, lightenValue),
      darken: darken(brandSecondary, darkenValue),
    },
    tertiary: {
      normal: brandTertiary,
      lighten: lighten(brandTertiary, lightenValue),
      darken: darken(brandTertiary, darkenValue),
    },
    success: {
      normal: success,
      lighten: lighten(success, lightenValue),
      darken: darken(success, darkenValue),
    },
    info: {
      normal: info,
      lighten: lighten(info, lightenValue),
      darken: darken(info, darkenValue),
    },
    warning: {
      normal: warning,
      lighten: lighten(warning, lightenValue),
      darken: darken(warning, darkenValue),
    },
    danger: {
      normal: danger,
      lighten: lighten(danger, lightenValue),
      darken: darken(danger, darkenValue),
    },
    link: {
      normal: link,
      lighten: lighten(link, lightenValue),
      darken: darken(link, darkenValue),
    },
    simple: {
      normal: simple,
      lighten: lighten(simple, lightenValue),
      darken: darken(simple, darkenValue),
    },
    'body-bg': bodyBg,
    'html-bg': htmlBg,
    'text-color': textColor,
    'link-color': brandPrimary,
  },
  buttons: {
    variant: {
      primary: {
        fill: {
          color: 'white',
          background: brandPrimary,
          hover: {
            color: 'white',
            background: '#F13D89',
            border: brandPrimary,
          },
        },
        outline: {
          color: brandPrimary,
          background: 'transparent',
          bordercolor: brandPrimary,
          hover: {
            color: 'white',
            background: '#F13D89',
            border: brandPrimary,
          },
        },
      },
      secondary: {
        fill: {
          color: 'white',
          background: brandSecondary,
          hover: {
            color: 'white',
            background: ' #3D47F5',
            border: brandSecondary,
          },
        },
        outline: {
          color: 'white',
          background: brandSecondary,
          hover: {
            color: 'white',
            background: ' #3D47F5',
            border: brandSecondary,
          },
        },
      },
      tertiary: {
        color: brandPrimary,
        background: '#e1f0fd',
        hover: {
          color: brandPrimary,
          background: '#e9f4fe',
          border: '#b9dcfb',
        },
      },
      link: {
        color: brandPrimary,
        background: 'transparent',
        hover: {
          color: brandPrimary,
          background: '#f6f6f7',
          border: '#b9dcfb',
        },
      },
      conectaPrimary: {
        color: 'white',
        background: '#8231C4',
        hover: {
          color: brandPrimary,
          background: '#a56bd6',
          border: '#dcc5ee',
        },
      },
      conectaSecondary: {
        color: '#8231C4',
        background: '#f0e6f8',
        hover: {
          color: brandPrimary,
          background: '#f4edfa',
          border: '#dcc5ee',
        },
      },
    },
    size: {
      small: {
        fontsize: '14px',
        lineheight: '34px',
      },
      medium: {
        fontsize: '16px',
        lineheight: '46px',
      },
      large: {
        fontsize: '18px',
        lineheight: '58px',
      },
    },
  },
  fonts: {
    inports: {
      primary: fontFamilyPrimaryImport,
      secondary: fontFamilySecondary,
    },
    families: {
      base: fontFamilyBase,
      primary: fontFamilyPrimary,
      secondary: fontFamilySecondary,
    },
    sizes: {
      normal: `${fontSizeBase * 1}px`,
      large: `${fontSizeBase * 1.25}px`,
      small: `${fontSizeBase * 0.85}px`,
      h1: `${fontSizeBase * 2.6}px`,
      h2: `${fontSizeBase * 2.15}px`,
      h3: `${fontSizeBase * 1.7}px`,
      h4: `${fontSizeBase * 1.25}px`,
      h5: `${fontSizeBase * 1}px`,
      h6: `${fontSizeBase * 0.85}px`,
    },
  },
  progressBar: {},
  grid: {},
  zindex: {
    navbar: 1000,
    dropdown: 1000,
    popover: 1060,
    tooltip: 1070,
    'navbar-fixed': 1030,
    'modal-background': 1040,
    modal: 1050,
  },
  inputs: {},
  alerts: {
    success: {
      color: `#3c763d`,
      bg: `#dff0d8`,
      border: darken(`#dff0d8`, darkenValue),
    },
    info: {
      color: `#31708f`,
      bg: `#d9edf7`,
      border: darken(`#d9edf7`, darkenValue),
    },
    warning: {
      color: `#8a6d3b`,
      bg: `#fcf8e3`,
      border: darken(`#fcf8e3`, darkenValue),
    },
    danger: {
      color: `#a94442`,
      bg: `#f2dede`,
      border: darken(`#f2dede`, darkenValue),
    },
  },
}

export default bumeranSkin
