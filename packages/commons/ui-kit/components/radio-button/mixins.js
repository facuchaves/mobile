const textColorWithError = '#FB2323'

export const makeRadioButtonComponent = () => {
  return `
  display: block;
  position: relative;`
}

export const makeInput = ({ small, disabled }) => {
  return `
  position: relative;
  opacity: 0;
  cursor: ${disabled ? 'not-allowed' : 'pointer'}; 
  z-index: 1;
  margin: 0;
  padding: 0;
  height: ${small ? '16px' : '18px'};
  width: ${small ? '16px' : '18px'};

  &:not(:disabled){
    &:focus ~ span, &:active ~ span{
      border: 2px solid #3D47F5;
      background: transparent;
    }

    &:checked ~ span {
      background-color:transparent;
      border: 6px solid #3D47F5;
    }

    &:checked ~ span:after {
      display: block;
    }
  }

  &:disabled {
    & ~ span{
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
  return `
  position: absolute;
  top: 50%;
  transform: translate(0%,-50%);
  left: 0;
  height: ${small ? '16px' : '20px'};
  width: ${small ? '16px' : '20px'};
  border-radius: 50%;
  border: 2px solid #ccc;

  &:after {
    content: "";
    position: absolute;
    display: none;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: ${small ? '6px' : '8px'};
	  height: ${small ? '6px' : '8px'};
    border-radius: 50%;
    background: white;
  }`
}

export const makeRedTextError = () => {
  return `
  color: ${textColorWithError};
  font-size: smaller;
  `
}
