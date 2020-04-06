import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Icon } from '../icon/Icon'
import { makeButton, makeIcon } from './mixins'

export const ButtonComponent = styled.button`
  ${props => makeButton(props)}
`

export const ButtonIcon = styled(Icon)`
  ${props => makeIcon(props)}
`

export const Button = ({ onClick, disabled, size, block, variant, outline, link, icon, iconPosition, children }) => {
  return (
    <ButtonComponent
      onClick={onClick}
      disabled={disabled}
      size={size}
      block={block}
      variant={variant}
      link={link}
      outline={outline}
      text={children}
      icon={icon}
      iconPosition={iconPosition}
    >
      {icon && <ButtonIcon size={size} name={icon} text={children} iconPosition={iconPosition} />}
      {children}
    </ButtonComponent>
  )
}

Button.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  size: PropTypes.string,
  block: PropTypes.bool,
  variant: PropTypes.string,
  link: PropTypes.bool,
  outline: PropTypes.bool,
  icon: PropTypes.string,
  iconPosition: PropTypes.string,
  children: PropTypes.string,
}

Button.defaultProps = {
  onClick: '',
  disabled: false,
  size: 'medium',
  block: false,
  variant: 'primary',
  link: false,
  outline: false,
  icon: '',
  iconPosition: 'left',
  children: '',
}
