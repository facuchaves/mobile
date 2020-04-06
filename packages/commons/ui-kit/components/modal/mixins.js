export const makeSimpleModalBackdrop = () => {
  return `opacity:.5;
          position:fixed;
          top:0;
          left:0;
          z-index:1040;
          width:100vw;
          height:100vh;
          background-color:#000;`
}

export const makeSimpleModal = () => {
  return `font-family: Open Sans;
          display:flex;
          align-items:center;
          justify-content:center;
          height:100%;`
}

export const makeSimpleModalDialog = ({ width }) => {
  return `position: relative;
          display: flex;
          flex-direction: column;
          background-color: #fff;
          background-clip: padding-box;
          max-width:${width}px;
          width:100%;
          max-height: calc( 100vh - 30px );
          pointer-events: auto;
          overflow-y: auto;`
}

export const makeSimpleModalContent = () => {
  return `position: relative;
          display: flex;
          flex-direction: column;
          background-color: #fff;
          outline: 0;`
}

export const makeSimpleModalHeader = () => {
  return `display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 75px 0px 20px;
          padding: 0px 24px;

          div {
            text-align: center;
          } 

          img {
            text-align: center;
            margin-bottom: 20px;
          }
          
          h3{
            flex: flex;
            align-self: center;
            flex-direction: column;
            width: 100%;
            text-align: center;
            font-family: Open Sans;
            font-style: normal;
            font-weight: bold;
            font-size: 18px;
            line-height: 25px;
            text-align: center;
            color: rgba(36, 40, 44, 0.88);
          }

          p {
            margin-top: 10px;
            text-align: center;
          }

          button{
            background: transparent;
            position: absolute;
            top: 22px;
            right: 16px;
            padding: 0;
            margin: 0;
            border: 0;
            line-height: 1;
          }`
}

export const makeSimpleModalBody = () => {
  return `position: relative;
          flex: 1 1 auto;
          padding: 0px 24px;
          line-height:1.75rem;`
}

export const makeSimpleModalFooter = () => {
  return `display: flex;
          align-items: center;
          justify-content: flex-end;
          padding: 0px 24px 168px;`
}
