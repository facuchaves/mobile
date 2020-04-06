import styled from 'styled-components'

const FooterContainer = styled.div`
  margin: 20px 0 30px;
`

const ListUrl = styled.ul`
  padding: 0;
  margin: 0;
  text-align: left;
  list-style: none;
`

const CopyrightFooter = styled.div`
  font-size: 12px;
  color: #7c7c7c;
  float: right;
  text-align: right;

  @media (min-width: 576px) {
    font-size: 14px;
  }
`

const Li = styled.li`
  font-size: 12px;
  line-height: 18px;
  display: block;
  float: left;
  position: relative;

  &:after {
    content: '-';
    padding: 0 5px;
  }

  &:last-child:after {
    content: '';
  }

  @media (min-width: 576px) {
    font-size: 14px;
    line-height: 31px;
  }
`

const ItemUrl = styled.a`
  font-size: 14px;
  line-height: 22px;
  text-decoration: none;

  @media (min-width: 576px) {
    font-size: 14px;
  }

  &:hover {
    text-decoration: none;
  }
`

const LogoNavent = styled.img`
  height: auto;
  width: 43px;
  margin: 4px 0;

  @media (min-width: 576px) {
    width: 71px;
  }
`

export { FooterContainer, ListUrl, Li, ItemUrl, CopyrightFooter, LogoNavent }
