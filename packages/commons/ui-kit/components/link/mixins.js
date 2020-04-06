const MakeSimpleLink = (theme, variant, size, outline, block) => {
  return `
    position: relative;
    border: 1px solid transparent;
    border-radius: 8px;
    vertical-align: middle;
    padding: 0px 15px;
    font-size: ${theme.links.size[size]};
    font-weight: 600;
    text-align: center;
    transition: all .2s ease-in-out;
    cursor: pointer;
    line-height: ${theme.links.size[size].lineheight};
    display: ${block ? `block` : `inline-block`};
    width: ${block ? `100%` : `auto`};
    text-decoration: none;

    &:hover,
    &:focus,
    &:active {
      outline: 0;
      text-decoration: none;
    }`
}

const MakeVariant = (theme, variant, size, style) => {
  if (!theme.links.variant[variant]) {
    return ``
  }

  return `
    background-color: ${theme.links.variant[variant][style].background};
    color: ${theme.links.variant[variant][style].color};
    border-color:  ${theme.links.variant[variant][style].bordercolor};

    &:hover{
      color: ${theme.links.variant[variant][style].hover.color};
      background-color: ${theme.links.variant[variant][style].hover.background};
      border-color: ${theme.links.variant[variant][style].hover.background};
    };
    
    &:before {
      border-color: ${theme.links.variant[variant][style].hover.border};
    }`
}

export const MakeLink = props => {
  // let { theme, variant, size, style } = props
  const linkSize = props.size || 'medium'
  const linkOutline = props.outline ? 'outline' : 'fill'
  return `${MakeSimpleLink(props.theme, props.variant, linkSize, linkOutline, props.block)}
          ${MakeVariant(props.theme, props.variant, linkSize, linkOutline, props.block)}`
}
