export const makeIcon = props => {
  const { color, size, name, source } = props

  return `width: ${size}px;
          height: ${size}px;

          &:before{
            content: '';
            display: block;
            background-color: ${color};
            mask: url(${source}#${name}-usage);
            width: ${size}px;
            height: ${size}px;
          }`
}
