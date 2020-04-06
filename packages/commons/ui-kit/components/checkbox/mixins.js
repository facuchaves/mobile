import { css, keyframes } from 'styled-components'
const textColorWithError = '#FB2323'

const checkboxOn = keyframes`
  0% {
    box-shadow: 0 0 0 10px, 10px -10px 0 10px, 32px 0 0 20px, 0px 32px 0 20px,
      -5px 5px 0 10px, 15px 2px 0 11px;
  }
  50% {
    box-shadow: 0 0 0 10px, 10px -10px 0 10px, 32px 0 0 20px, 0px 32px 0 20px,
      -5px 5px 0 10px, 20px 2px 0 11px;
  }
  100% {
    box-shadow: 0 0 0 10px, 10px -10px 0 10px, 32px 0 0 20px, 0px 32px 0 20px,
      -5px 5px 0 10px, 20px -12px 0 11px;
  }
`

const checkboxOff = keyframes`
  0% {
    box-shadow: 0 0 0 10px, 10px -10px 0 10px, 32px 0 0 20px, 0px 32px 0 20px,
      -5px 5px 0 10px, 20px -12px 0 11px, 0 0 0 0 inset;
  }
  25% {
    box-shadow: 0 0 0 10px, 10px -10px 0 10px, 32px 0 0 20px, 0px 32px 0 20px,
      -5px 5px 0 10px, 20px -12px 0 11px, 0 0 0 0 inset;
  }
  50% {
    transform: rotate(45deg);
    margin-top: -4px;
    margin-left: 6px;
    width: 0;
    height: 0;
    box-shadow: 0 0 0 10px, 10px -10px 0 10px, 32px 0 0 20px, 0px 32px 0 20px,
      -5px 5px 0 10px, 15px 2px 0 11px, 0 0 0 0 inset;
  }
  51% {
    transform: rotate(0deg);
    margin-top: -2px;
    margin-left: -2px;
    width: 20px;
    height: 20px;
    box-shadow: 0 0 0 0, 0 0 0 0, 0 0 0 0, 0 0 0 0, 0 0 0 0, 0 0 0 0,
      0px 0 0 10px inset;
  }
  100% {
    transform: rotate(0deg);
    margin-top: -2px;
    margin-left: -2px;
    width: 20px;
    height: 20px;
    box-shadow: 0 0 0 0, 0 0 0 0, 0 0 0 0, 0 0 0 0, 0 0 0 0, 0 0 0 0,
      0px 0 0 0 inset;
  }
`

export const makeCheckboxComponent = () => {
  return `
  display: block;
  position: relative;`
}

export const makeInput = ({ small, disabled }) => {
  return css`
    position: relative;
    opacity: 0;
    cursor: ${disabled ? 'not-allowed' : 'pointer'};
    z-index: 1;
    margin: 0;
    padding: 0;
    height: ${small ? '16px' : '18px'};
    width: ${small ? '16px' : '18px'};

    &:not(:disabled) {
      &:focus ~ span,
      &:active ~ span {
        border: 2px solid #3d47f5;
        background: transparent;
      }

      &:checked ~ span {
        border: 2px solid #3d47f5;

        &:before {
          box-shadow: 0 0 0 10px, 10px -10px 0 10px, 32px 0 0 20px, 0 32px 0 20px, -5px 5px 0 10px, 20px -12px 0 11px;
          animation: ${checkboxOn} 0.3s forwards;
        }
      }
    }

    &:disabled {
      & ~ span {
        border: 2px solid rgba(0, 0, 24, 0.08);
      }
    }
  `
}

export const makeLabel = ({ disabled, small }) => {
  return `
  display: inline-block;
  margin-left: ${small ? '16px' : '12px'};
  font-size: ${small ? '14px' : '16px'};
  color: ${disabled ? 'rgba(0, 0, 24, 0.16)' : 'rgba(0, 0, 24, 0.84)'};`
}

export const makeCheckmark = ({ small }) => {
  return css`
    position: absolute;
    top: 50%;
    transform: translate(0%, -50%);
    left: 0;
    height: ${small ? '16px' : '20px'};
    width: ${small ? '16px' : '20px'};
    border-radius: 4px;
    border: 2px solid #ccc;
    overflow: hidden;

    &:before {
      position: absolute;
      content: '';
      transform: rotate(45deg);
      display: block;
      margin-top: ${small ? '-6px' : '-4px'};
      margin-left: ${small ? '4px' : '6px'};
      width: 0;
      height: 0;
      color: #3d47f5;
      box-shadow: 0 0 0 0, 0 0 0 0, 0 0 0 0, 0 0 0 0, 0 0 0 0, 0 0 0 0, 0 0 0 0 inset;
      animation: ${checkboxOff};
    }
  `
}

export const makeRedTextError = () => {
  return `
  color: ${textColorWithError};
  font-size: smaller;
  `
}
