export const makeField = ({ theme }) => {
  return `
  position: relative;
  display: inline-flex;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &.with-error {
    input, input:focus, textarea, textarea:focus, .select__control{
      border: ${theme.form.border.borderWeight} solid;
      border-color: ${theme.form.withError.color};

      i:before{
        background-color: ${theme.form.withError.color};
      }

      &.select__control--menu-is-open {
        border: ${theme.form.border.borderWeight} solid;
        border-color: ${theme.form.withError.color};

        .select__placeholder, .select__value-container .select__single-value {
          color: ${theme.form.withError.color};
        }
      }

      .select__placeholder{
        color: ${theme.form.withError.color};
      }

      .select__indicators {
        svg{
          fill: ${theme.form.withError.color};
        }
      }
    }
  }
`
}
