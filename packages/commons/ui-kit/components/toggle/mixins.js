export const MakeToggleContainer = ({ small }) => {
  return `
    position: relative;
    display: inline-block;
    width: ${small ? '32px' : '58px'};
    height: ${small ? '12px' : '24px'};
    margin-top:2px;
    line-height: ${small ? '12px' : '24px'};

    > input{
      display: none;
    } 
  `
}

export const MakeToggleSlider = ({ theme, disabled, checked, small }) => {
  let backgroundColor
  if (disabled) backgroundColor = theme.toggle.disabled.bg
  else backgroundColor = checked ? theme.toggle.checked.bg : theme.toggle.unChecked.bg

  let sliderColor
  if (disabled) sliderColor = theme.toggle.disabled.slide
  else sliderColor = checked ? theme.toggle.checked.slide : theme.toggle.unChecked.slide

  return `
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${backgroundColor};
    transition: 0.4s;
    border-radius: 15px;

    &:before{
      position: absolute;
      content:'';
      height: ${small ? '16px' : '28px'};
      width: ${small ? '16px' : '28px'};
      background-color: ${sliderColor};
      transition: 0.2s;
      border-radius: 50%;
      top:-2px;
    }
  `
}

export const MakeToggleInput = ({ small }, target) => {
  return `&:checked + ${target}{
    &:before {
			transform: translateX(${small ? '20px' : '34px'});
		}
	}`
}
