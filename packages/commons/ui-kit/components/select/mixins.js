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

export const makeSelect = ({ theme, small, withBeforeElement, lighten }) => {
  const size = small ? 'small' : 'medium'
  const colorStyle = lighten ? 'lighten' : 'darken'

  return `position: relative;
          outline: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          -moz-osx-font-smoothing: grayscale;
          -webkit-font-smoothing: antialiased;
          resize: none;
          font-size: ${theme.form.size[size].fontsize};
          font-weight: 400;
          letter-spacing: 0.009375em;
          text-decoration: inherit;
          text-transform: inherit;
          align-self: flex-end;
          box-sizing: border-box;
          width: 100%;
          min-height: ${theme.form.size[size].height};
          transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);
          outline: none;
          padding: 0;

          /**
           *  Estilos en caso que el campo posea contenido o se encuentra activo
           */

          .select__indicators {
            span {
              display: none;
            }

            svg {
              fill: ${theme.form.variant[colorStyle].focus.color};
              transition: all .2s ease-in-out;
            }
          }

          & > .select__control, & > .select__control:hover {
            border: ${theme.form.border.borderWeight} solid;
            border-color: ${theme.form.variant[colorStyle].borderColor};
            border-radius: ${theme.form.border.borderRadius};
            background: ${theme.form.variant[colorStyle].background};
            color: rgba(0, 0, 24, 0.6);
            padding: ${withBeforeElement ? '0 16px 0 43px' : '0 16px'};
            height: ${theme.form.size[size].height};
            box-shadow: none;

            .select__value-container {
              padding: 0;

              .select__single-value {
                font-weight: 600;
                color: ${theme.form.variant[colorStyle].color};
              }
            }

            &.select__control--menu-is-open {
              border-color: ${theme.form.variant[colorStyle].focus.borderColor};

              .select__placeholder, .select__value-container .select__single-value {
                color: ${theme.form.variant[colorStyle].focus.color};
              }

              .select__indicators {
                svg {
                  transform: rotate(180deg);
                }
              }
            }
          }

          & > .select__menu {
            margin-top: 4px;
            border-radius: ${theme.form.border.borderRadius};
            background: ${theme.form.variant[colorStyle].background};
            color: ${theme.form.variant[colorStyle].color};
            padding: 8px;

            .select__option {
              border-radius: 4px;
              font-weight: 600;
              padding: 0 12px;
              line-height: 36px;
              font-size: ${theme.form.size[size].fontsize};
              cursor: pointer;

              &.select__option--is-selected, &.select__option--is-focused {
                color: ${theme.form.variant[colorStyle].color};
                background: ${lighten ? 'rgba(0, 0, 24, 0.04)' : 'rgba(0, 0, 24, 0.08)'};
              }
            }
          }
          
          & > .select__control--is-disabled{
            .select__placeholder{
              color: ${theme.form.disabled.color};
            }

            .select__indicators {
              svg{
                fill: ${theme.form.disabled.color};
              }
            }
          }`
}

export const makeHelperLine = () => {
  return `padding: 0px 16px;`
}

export const makeHelperText = () => {
  return `font-style: normal;
          font-weight: 300;
          font-size: 12px;
          line-height: 20px;
          text-align: right;
          color: rgba(36, 40, 44, 0.76);`
}

export const makeErrorMessage = ({ theme }) => {
  return `font-style: normal;
          font-weight: 300;
          font-size: 12px;
          line-height: 20px;
          text-align: right;
          color: ${theme.form.withError.color};`
}
