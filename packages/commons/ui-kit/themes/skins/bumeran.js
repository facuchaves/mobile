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
const brandDefault = `rgba(0, 0, 24, 0.72)`
const brandPrimary = `#EB0064`
const brandSecondary = `#000DF1`
const brandTertiary = `#259DD5`

// Button status colors
const buttonDefaultHover = `rgba(0, 0, 24, 0.84)`
const buttonPrimaryHover = `#F13D89`
const buttonSecondaryHover = `#3D47F5`

const buttonDefaultActive = `#000018`
const buttonPrimaryActive = `#D9005C`
const buttonSecondaryActive = `#000AB8`

const buttonFocusOutline = `#3DE5DF`

const success = `#51CF66`
const info = `#259DD5`
const warning = `#FAB005`
const danger = `#C92A2A`
const link = `#000DF1`
const simple = `#808080`

// Background color for `<body>`.
const bodyBg = `transparent`

// Background color for `<html>`.
const htmlBg = `transparent`

// Global text color on `<body>`.
const textColor = `#212121`

// Form
// Form Colors
const formPrimary = `#F5F5F5`
const formSecondary = `#FFFFFF`

// Background colors for Input, Textarea and Select.
const formBackgroundDarken = formPrimary
const formBackgroundLighten = formSecondary

// Border styles for Input, Textarea and Select.
const formBorderWeight = `1px`
const formBorderRadius = `8px`
const formBorderDarken = formPrimary
const formBorderLighten = formSecondary
const formBorderActive = `#3D47F5`

// Color styles for Input, Textarea and Select.
const formColor = `rgba(0, 0, 24, 0.6)`
const formColorActive = `#3D47F5`
const formWithError = `#EC0000`

const formDisabled = `#C3C2C8`

const bumeranSkin = {
  portal: 'bumeran',
  colors: {
    default: {
      normal: brandDefault,
      lighten: lighten(brandDefault, lightenValue),
      darken: darken(brandDefault, darkenValue),
    },
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
      default: {
        fill: {
          color: 'white',
          background: brandDefault,
          hover: {
            color: 'white',
            background: buttonDefaultHover,
            border: buttonDefaultHover,
          },
          active: {
            color: 'white',
            background: buttonDefaultActive,
            border: buttonDefaultActive,
          },
          focus: {
            color: 'white',
            background: buttonDefaultHover,
            border: 'transparent',
            outline: buttonFocusOutline,
          },
        },
        link: {
          color: brandDefault,
          background: 'transparent',
          hover: {
            color: buttonDefaultHover,
            background: 'transparent',
            border: 'transparent',
          },
          active: {
            color: buttonDefaultActive,
            background: 'transparent',
            border: 'transparent',
          },
          focus: {
            color: buttonDefaultHover,
            background: 'transparent',
            border: 'transparent',
            outline: 'transparent',
          },
        },
      },
      primary: {
        fill: {
          color: 'white',
          background: brandPrimary,
          hover: {
            color: 'white',
            background: buttonPrimaryHover,
            border: buttonPrimaryHover,
          },
          active: {
            color: 'white',
            background: buttonPrimaryActive,
            border: buttonPrimaryActive,
          },
          focus: {
            color: 'white',
            background: brandPrimary,
            border: 'transparent',
            outline: buttonFocusOutline,
          },
        },
        outline: {
          color: brandPrimary,
          background: 'transparent',
          bordercolor: brandPrimary,
          hover: {
            color: buttonPrimaryHover,
            background: 'rgba(255, 255, 255, 0.72)',
            border: buttonPrimaryHover,
          },
          active: {
            color: buttonPrimaryActive,
            background: 'rgba(255, 255, 255, 0.24)',
            border: buttonPrimaryActive,
          },
          focus: {
            color: brandPrimary,
            background: 'transparent',
            border: brandPrimary,
            outline: buttonFocusOutline,
          },
        },
        link: {
          color: brandPrimary,
          background: 'transparent',
          hover: {
            color: buttonPrimaryHover,
            background: 'transparent',
            border: 'transparent',
          },
          active: {
            color: buttonPrimaryActive,
            background: 'transparent',
            border: 'transparent',
          },
          focus: {
            color: brandPrimary,
            background: 'transparent',
            border: 'transparent',
            outline: 'transparent',
          },
        },
      },
      secondary: {
        fill: {
          color: 'white',
          background: brandSecondary,
          hover: {
            color: 'white',
            background: buttonSecondaryHover,
            border: buttonSecondaryHover,
          },
          active: {
            color: 'white',
            background: buttonSecondaryActive,
            border: buttonSecondaryActive,
          },
          focus: {
            color: 'white',
            background: brandSecondary,
            border: 'transparent',
            outline: buttonFocusOutline,
          },
        },
        link: {
          color: brandSecondary,
          background: 'transparent',
          hover: {
            color: buttonSecondaryHover,
            background: 'transparent',
            border: 'transparent',
          },
          active: {
            color: buttonSecondaryActive,
            background: 'transparent',
            border: 'transparent',
          },
          focus: {
            color: brandSecondary,
            background: 'transparent',
            border: 'transparent',
            outline: 'transparent',
          },
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
        widthNoText: '36px',
        heightNoText: '36px',
      },
      medium: {
        fontsize: '16px',
        lineheight: '46px',
        widthNoText: '48px',
        heightNoText: '48px',
      },
      large: {
        fontsize: '18px',
        lineheight: '58px',
        widthNoText: '60px',
        heightNoText: '60px',
      },
    },
  },
  links: {
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
      small: `${fontSizeBase * 0.85}px`,
      normal: `${fontSizeBase * 1}px`,
      large: `${fontSizeBase * 1.25}px`,
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
  alerts: {},
  form: {
    border: {
      borderWeight: formBorderWeight,
      borderRadius: formBorderRadius,
    },
    variant: {
      lighten: {
        color: formColor,
        background: formBackgroundLighten,
        borderColor: formBorderLighten,
        focus: {
          color: formColorActive,
          background: formBackgroundLighten,
          borderColor: formBorderActive,
        },
      },
      darken: {
        color: formColor,
        background: formBackgroundDarken,
        borderColor: formBorderDarken,
        focus: {
          color: formColorActive,
          background: formBackgroundDarken,
          borderColor: formBorderActive,
        },
      },
    },
    size: {
      small: {
        fontsize: '14px',
        height: '36px',
        lineHeight: '20px',
      },
      medium: {
        fontsize: '16px',
        height: '48px',
        lineHeight: '20px',
      },
    },
    withError: {
      color: formWithError,
      borderColor: formWithError,
    },
    disabled: {
      color: formDisabled,
      borderColor: formDisabled,
    },
  },
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
  toggle: {
    unChecked: {
      slide: `#6472F3`,
      bg: `#D4D3D9`,
    },
    disabled: {
      slide: `#C2C2C8`,
      bg: `#D5D4DA`,
    },
    hover: {
      slide: `#6472F3`,
      bg: `#D4D3D8`,
    },
    checked: {
      slide: `#0A26EE`,
      bg: `#B9C2F9`,
    },
  },
}

export default bumeranSkin
