import styled from 'styled-components'

const ItemCountry = styled.a`
  width: 100%;
  font-size: 14px;
  color: #7c7c7c;
  text-aling: left;
  text-decoration: none;
  display: block;
  padding: 3px 20px;

  img {
    margin-right: 5px;
  }

  &:hover {
    background-color: #f5f5f5;
    text-decoration: none;
    cursor: pointer;
  }
`

const PlaceholderFlag = styled.img`
  margin-right: 5px;
`

const PlaceholderCountry = styled.span`
  line-height: 20px;
  vertical-align: middle;
  color: #7c7c7c;
`

export { ItemCountry, PlaceholderFlag, PlaceholderCountry }
