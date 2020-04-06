/* eslint-disable */
export const makeTooltipContainer = () => {
  return `
  position: relative;
  width: fit-content;
  display: inline-block;
  vertical-align: middle;`
}

export const makeTooltipMessage = ({ placement }) => {
  return `
  z-index: 9999;
  display: block;
  background-color: white;
  padding: 10px 20px;
  color: rgba(0, 0, 24, 0.84);
  border-radius: 16px;
  box-shadow: 0px 3px 14px rgba(0,0,0,0.05);
  transition: all 0.2s ease-in-out;
  line-height: 30px;
  position: absolute;
  font-weight: normal;

  ${placement === 'top-center' || placement === 'top-left' || placement === 'top-right' ? 'bottom' : 'top'}: ${
    placement === 'center-left' || placement === 'center-right' ? '50%' : 'calc(120% + 8px)'
  };

  ${placement === 'top-right' || placement === 'center-left' || placement === 'bottom-right' ? 'right' : 'left'}: ${
    placement === 'top-center' || placement === 'bottom-center'
      ? '50%'
      : placement === 'center-left' || placement === 'center-right'
      ? 'calc(120% + 8px)'
      : '0'
  };
  
  transform: translate(${placement === 'bottom-center' || placement === 'top-center' ? '-50%' : '0%'}, ${
    placement === 'center-left' || placement === 'center-right' ? '-50%' : '0%'
  });

  width: 300px;

  h3{
    padding-top: 15px;
    font-size: 15px;
    font-weight: bold;
  }

  p{
    font-size: 12px;
  }`
}

export const makeTooltipArrow = ({ placement }) => {
  return `
  display: ${placement !== null ? 'block' : 'none'};
  position: absolute;
  z-index: 10;
  content: "";
   ${placement === 'top-center' || placement === 'top-left' || placement === 'top-right' ? 'bottom' : 'top'}: ${
    placement === 'center-left' || placement === 'center-right' ? '50%' : '120%'
  };

  ${placement === 'center-left' ? 'right' : 'left'}: ${
    placement === 'center-right' || placement === 'center-left' ? '116%' : '50%'
  };
  
  transform: translate(${placement === 'center-left' || placement === 'center-right' ? '0%' : '-50%'}, ${
    placement === 'center-left' || placement === 'center-right'
      ? '-50%'
      : placement === 'center-left' || placement === 'center-right'
      ? '100%'
      : '0'
  })

  rotate(${
    placement === 'bottom-center' || placement === 'bottom-left' || placement === 'bottom-right'
      ? '0deg'
      : placement === 'top-center' || placement === 'top-right' || placement === 'top-left'
      ? '180deg'
      : placement === 'center-right'
      ? '-90deg'
      : '90deg'
  });

  border-style: solid;
  border-width: 0 6px 8px;
  border-color: transparent transparent white;
`
}

export const makeTooltipCloseButton = () => {
  return `
  position: absolute;
  top: 17px;
  right: 17px;
  background: transparent;
  color: black;
  line-height: normal;
  font-weight: normal;
  border: none;

  &:focus{
    &:before{
      border: none;
    }
  }`
}
