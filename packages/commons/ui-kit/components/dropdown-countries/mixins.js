import styled from 'styled-components'

const ItemCountry = styled.a`
  display: block;
  font-size: 10px;
  transition: background-color 0.3s ease-in-out;
  color: #7c7c7c;

  &:hover {
    text-decoration: none;
    cursor: pointer;
  }
`

const PlaceholderFlag = styled.img`
  display: inline-block;
  width: auto;
  height: 17px;
  vertical-align: middle;
  margin-right: 5px;
`

const PlaceholderCountry = styled.span`
  vertical-align: middle;
  display: inline-block;
  color: #7c7c7c;
`

export { ItemCountry, PlaceholderFlag, PlaceholderCountry }
