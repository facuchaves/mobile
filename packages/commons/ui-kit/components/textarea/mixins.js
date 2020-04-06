export const makeFieldBefore = () => {
  return `
  & > * {
    z-index: 99999;
    position: absolute !important;
    left: 13px;
    top: 50%;
    transform: translateY(-50%);
  }`
}
export const makeFieldAfter = () => {
  return `
  & > * {
    z-index: 99999;
    position: absolute !important;
    right: 18px;
    top: 50%;
    transform: translateY(-50%);
  }`
}

export const makeTextareaField = ({ theme, lighten, small }) => {
  const size = small ? 'small' : 'medium'
  const colorStyle = lighten ? 'lighten' : 'darken'

  return `
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  resize: none;
  font-size: ${theme.form.size[size].fontsize};
  font-style: normal;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: normal;
  letter-spacing: 0.009375em;
  text-decoration: inherit;
  text-transform: inherit;
  align-self: flex-end;
  box-sizing: border-box;
  width: 100%;
  min-height: 200px;
  line-height: ${theme.form.size[size].lineHeight};
  padding: 12px 16px;
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
  border: ${theme.form.border.borderWeight} solid;
  border-radius: ${theme.form.border.borderRadius};
  border-color: ${theme.form.variant[colorStyle].borderColor};
  background: ${theme.form.variant[colorStyle].background};
  color: ${theme.form.variant[colorStyle].color};
  overflow: hidden;

  /**
   *  Estilos en caso que el campo posea contenido o se encuentra activo
   */

  &:focus{
    color: ${theme.form.variant[colorStyle].focus.color};
    border-radius: ${theme.form.border.borderRadius};
    border-color: ${theme.form.variant[colorStyle].focus.borderColor};
  }

  &:not(:placeholder-shown){
    font-weight: 600;
  }

  &:disabled{
    &::placeholder{
      color: ${theme.form.disabled.color};
    }
  }
`
}

export const makeHelperLine = () => {
  return `
  padding: 0px 16px;
  position: relative;
`
}

export const makeHelperText = () => {
  return `
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 20px;
  text-align: right;
  color: rgba(36, 40, 44, 0.76);
`
}

export const makeCharacterCounter = () => {
  return `
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 20px;
  text-align: right;
  position: absolute;
  right: 8px;
  bottom: 24px;
  color: rgba(36, 40, 44, 0.76);
`
}

export const makeErrorMessage = ({ theme }) => {
  return `
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 20px;
  text-align: right;
  color: ${theme.form.withError.color};
`
}
