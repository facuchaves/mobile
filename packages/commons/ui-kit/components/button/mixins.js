const disabledColor = '#C3C2C8'

const makeSimpleButton = (theme, size, style, block, text, icon, iconPosition) => {
  const paddingValues = {
    large: '50px',
    medium: '19px',
    small: '14px',
  }

  const padding = !icon
    ? '0'
    : iconPosition === 'right'
    ? `0 ${paddingValues[size]} 0 5px`
    : `0 5px 0 ${paddingValues[size]}`

  return `
    position: relative;
    border: 1px solid transparent;
    border-radius: 8px;
    font-size: ${theme.buttons.size[size].fontsize};
    font-weight: 600;
    transition: all .2s ease-in-out;
    cursor: pointer;
    line-height: ${theme.buttons.size[size].lineheight};
    display: block;
    text-align: center;
    min-width: ${text ? '160px' : '36px'};
    width: ${block ? `100%` : !text ? theme.buttons.size[size].widthNoText : `auto`};
    height: ${!text ? theme.buttons.size[size].heightNoText : `auto`};
    padding: ${padding};

    &:hover,
    &:focus,
    &:active {
      outline: 0;
    }

    &:disabled, &:disabled:hover{
      cursor: not-allowed;
      background-color: ${style === 'outline' || style === 'link' ? 'transparent' : disabledColor};
      color: ${style === 'outline' || style === 'link' ? disabledColor : 'white'};
      border-color: ${style === 'link' ? 'none' : '#C3C2C8'};

      i:before {
        background-color: ${style === 'outline' || style === 'link' ? disabledColor : 'white'}
      }
      
    }`
}

const makeVariant = (theme, variant, size, style, disabled) => {
  if (!theme.buttons.variant[variant]) {
    return ``
  }

  return `
    background-color: ${theme.buttons.variant[variant][style].background};
    color: ${theme.buttons.variant[variant][style].color};
    border-color:  ${theme.buttons.variant[variant][style].bordercolor};

    i:before {
      background-color: ${
        style === 'outline' || style === 'link' ? theme.buttons.variant[variant][style].color : 'white'
      };
    }

    &:hover{
      color: ${theme.buttons.variant[variant][style].hover.color};
      background-color: ${theme.buttons.variant[variant][style].hover.background};
      border-color: ${theme.buttons.variant[variant][style].hover.border};

      i:before{
        background-color: ${
          disabled && (style === 'outline' || style === 'link')
            ? disabledColor
            : (style === 'outline' || style === 'link') && !disabled
            ? theme.buttons.variant[variant][style].hover.color
            : 'white'
        };
      }
    }
    
    &:active{
      color: ${theme.buttons.variant[variant][style].active.color};
      background-color: ${theme.buttons.variant[variant][style].active.background};
      border-color: ${theme.buttons.variant[variant][style].active.border};

      i:before{
        background-color: ${
          disabled && (style === 'outline' || style === 'link')
            ? disabledColor
            : (style === 'outline' || style === 'link') && !disabled
            ? theme.buttons.variant[variant][style].active.color
            : 'white'
        };
      }
    }
    
    &:focus{
      color: ${theme.buttons.variant[variant][style].focus.color};
      background-color: ${theme.buttons.variant[variant][style].focus.background};
      border-color: ${theme.buttons.variant[variant][style].focus.border};
      outline:  ${theme.buttons.variant[variant][style].focus.outline} solid 2px;

      i:before{
        background-color: ${
          disabled && (style === 'outline' || style === 'link')
            ? disabledColor
            : (style === 'outline' || style === 'link') && !disabled
            ? theme.buttons.variant[variant][style].focus.color
            : 'white'
        };
      }
    }`
}

export const makeButton = props => {
  const buttonSize = props.size || 'medium'
  const buttonStyle = props.outline ? 'outline' : props.link ? 'link' : 'fill'

  return `${makeSimpleButton(
    props.theme,
    buttonSize,
    buttonStyle,
    props.block,
    props.text,
    props.icon,
    props.iconPosition
  )}
          ${makeVariant(props.theme, props.variant, buttonSize, buttonStyle, props.disabled)}`
}

export const makeIcon = ({ iconPosition, text, size }) => {
  const positionSize = {
    large: '15px',
    medium: '14px',
    small: '9px',
  }

  const iconSize = {
    large: '30px',
    medium: '24px',
    small: '18px',
  }

  const position = iconPosition === 'right' ? 'right' : 'left'
  const distance = !text ? '50%' : positionSize[size]

  return `
      position: absolute;
      ${position}: ${distance};
      top: 50%;
      transform: translate(${!text ? '-50%' : '0'}, -50%);  
      width: ${iconSize[size]};
      height: ${iconSize[size]};

      &:before{
        width: ${iconSize[size]};
        height: ${iconSize[size]};
      }
`
}
