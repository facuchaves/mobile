export const makeSimpleCard = () => {
  return `width: 100%;
          max-width: 400px;
          background-color: white;
          display: block;
          padding: 15px;
          margin: 0 auto 10px;
          border-radius: 2px;
          box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.24);

          &:hover {
            text-decoration: none;
          }

          @media (min-width: 768px) {
            min-height: 110px;
          }`
}
export const makeSimpleCardWithoutImg = () => {
  return `border: 1px solid rgba(36, 40, 44, 0.16);
  border-radius: 8px;
  box-shadow: none;
  position: relative;`
}

export const makeSimpleCardLogo = () => {
  return `height: 56px;
          float: left;
          border: solid 1px #dcdcdc;

          @media (min-width: 768px) {
            height: 80px;
          }`
}

export const makeSimpleCardTitle = () => {
  return `font-size: 16px;
          color: #329af0;
          margin: 0 0 2px 0;
          line-height: 19px;
          text-decoration: none;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;`
}

export const makeSimpleCardTitleWithoutImg = () => {
  return `height: 36px;
  width: 90%;`
}

export const makeSimpleCardCompany = () => {
  return `font-size: 14px;
          color: #515151;
          font-weight: 600;
          line-height: 19px;
          margin: 0;`
}

export const makeSimpleCardDescription = () => {
  return `display: block;
          margin-left: 98px;
          margin-top: -3px;
          
          @media (min-width: 768px) {
            margin-top: 0;
            margin-left: 135px;
          }`
}

export const makeSimpleCardDescriptionWithoutImg = () => {
  return `margin-left: 0 !important;
          svg {
            position: absolute;
            top: 0;
            right: 15px;
            margin-top: 25px;
        }        
  `
}

export const makeSimpleCardLocation = () => {
  return `font-size: 11px;
          color: #515151;
          font-weight: 400;
          line-height: 15px;
          margin: 0;
          display: inline-block;`
}

export const makeSimpleCardDate = () => {
  return `font-size: 11px;
          color: #7c7c7c;
          font-weight: 400;
          line-height: 15px;
          display: inline-block;
          margin: 0;

          &:before {
            content:"•";
            display: inline-block;
            color: #7c7c7c;
            margin: 0 2px;
            vertical-align: -2px;
            transform: scale(0.8);
          }`
}

export const makeSimpleCardDateWithoutImg = () => {
  return `position:absolute;
  right: 0;
  margin-right:15px;
  `
}
