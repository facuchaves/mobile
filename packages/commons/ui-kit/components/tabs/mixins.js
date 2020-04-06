export const makeTabContainer = () => {
  return `
  background-color: rgba(0, 0, 24, 0.04);
  border-radius: 8px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.12);

  .nav-links{
    justify-content: space-around;
    flex-direction: row;

    .nav-item{
      width: -webkit-fill-available;
      text-align: center;
    }
  }
  
  @media (min-width: 576px) {
    .nav-links{
      justify-content: normal;

      .nav-item{
        width: auto;
      }
    }
  }


  `
}

export const makeTabLink = props => {
  return `
  display: block;
  padding: 6px 12px;
  color: ${props.isActive ? '#e90066 !important' : 'black'};
  font-weight:  ${props.isActive ? 'bold' : 'normal'};
  border-radius:  ${props.isActive ? '8px 8px 0px 0px' : 'none'};
  background-color:  ${props.isActive ? '#ffffff' : 'transparent'};
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  `
}

export const makeTabContent = () => {
  return ` 
  padding: 24px 12px 17px;
  background-color: white;
`
}
