export const makeChip = props => {
  const backgroundColor = `#e0e0e0`
  return `
  margin: 4px
  display: inline-block;
  background: ${backgroundColor};
  padding: 0 12px;
  border-radius: 32px;
  font-size: 13px;
  &:hover {
    background: #ccc;
  }
  `
}
