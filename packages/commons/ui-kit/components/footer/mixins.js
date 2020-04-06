import styled from 'styled-components'

const FooterContainer = styled.div`
  margin: 50px 0;
  padding: 20px 0px 10px;
  @media (min-width: 576px) {
    padding: 35px 0;
  }
  background-color: ${props => (props.theme.portal === 'zonajobs' ? '#ffffff' : 'transparent')}};
`

const Ul = styled.ul`
  padding: 0;
  margin: 0;
  text-align: left;
  list-style: none;

  @media (min-width: 550px) {
    margin-right: 17px;
  }

  @media (min-width: 580px) {
    margin-right: 0;
  }
`

const CopyrightFooter = styled.div`
  font-size: 12px;
  color: #7c7c7c;
  display: inline-block;
  vertical-align: middle;
  text-align: right;

  @media (min-width: 576px) {
    font-size: 14px;
  }
`

const Li = styled.li`
  position: relative;
  padding-right: 7px;
  margin-right: 7px;
  float: left;
  text-align: left;

  &:after {
    content: '-';
    display: block;
    color: ${props => props.theme.colors.primary.normal};
    font-size: 14px;
    font-weight: 500;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(50%, -50%);
  }

  &:last-child {
    &:after {
      display: none;
    }
  }

  &:nth-child(3) {
    & + li {
      @media (min-width: 768px) {
        clear: both;
      }
    }

    &:after {
      @media (min-width: 768px) {
        display: none;
      }
    }
  }
`

const A = styled.a`
  display: block;

  &:hover {
    text-decoration: none;
  }
`

const H4 = styled.h4`
  margin: 0;
  color: ${props => props.theme.colors.primary.normal};

  font-size: 14px;
  line-height: 22px;
  vertical-align: middle;

  @media (min-width: @screen-sm-min) {
    line-height: 19px;
  }
`

const DataFiscal = styled.div`
  width: 40px;
  margin-left: 15px;
  display: inline-block;

  img {
    width: 100%;
  }

  @media (max-width: 576px) {
    margin-left: 10px;
    .img {
      width: 95%;
    }
  }
`

const LogoNavent = styled.img`
  height: auto;

  @media (min-width: 576px) {
    width: 65px;
  }
`

export { FooterContainer, Ul, Li, A, H4, CopyrightFooter, LogoNavent, DataFiscal }
