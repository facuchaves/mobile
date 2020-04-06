export const MakeSearchbar = () => {
  return `display: flex;
          justify-content: left;
          flex-basis: 612px;`
}

export const MakeForm = () => {
  return `display: flex;
          justify-content: left;
          flex-basis: 612px;
          background: rgba(0, 0, 24, 0.04);
          border-radius: 8px;
          border: 1px solid transparent;
          border-right: 0px;
          transition: all .3s ease-in-out;

          &.focusin {
            border-color: #000DF1;
            outline: none;
          }
          
          & > input {
            border-right: 1px solid rgba(0, 0, 24, 0.08);
          }`
}

export const MakeInput = () => {
  return `background: 0 0;
          display: flex;
          justify-content: left;
          flex-basis: 351px;
          padding: 0px 12px;
          margin: 0px;
          border: 0;
          outline: none;`
}

export const MakeButton = () => {
  return ``
}
