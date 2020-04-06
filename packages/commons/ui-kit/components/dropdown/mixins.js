export const MakeDropdownBackdrop = () => {
  return `opacity:.5;
          position:fixed;
          top:0;
          left:0;
          z-index:1040;
          width:100vw;
          height:100vh;
          background-color:transparent;`
}

export const MakeDropdownToggle = props => {
  return `${props.variant === 'toggle-with-image' &&
    `padding: 0;
             margin: 0 3px;
             width: 40px;
             height: 40px;
             line-height: 40px;
             text-align: center;
             border-radius: 100%;
             overflow: hidden;
             position: relative;`}

          & > img {
            display: block;
            height: 40px;
            min-width: 40px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
          }

          &.with-arrow {
            &:after {
              display: inline-block;
              margin-left: .255em;
              vertical-align: .255em;
              content: "";
              border-top: .3em solid;
              border-right: .3em solid transparent;
              border-bottom: 0;
              border-left: .3em solid transparent;
              transition: transform .3s ease-in-out;
            }

            &.dropdown-open {
              &:after {
                transform: rotate(-180deg)
              }
            }
          }`
}

export const MakeDropdownMain = () => {
  return `position: relative;
          padding: 2px;`
}

export const MakeDropdownMenu = () => {
  return `position: absolute;
          z-index: 1041;
          display: inline-block;
          min-width: 160px;
          box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
          padding: 12px 16px;
          float: left;
          font-size: 1rem;
          text-align: left;
          list-style: none;
          background-color: #fff;
          background-clip: padding-box;
          border: 1px solid rgba(0,0,0,.15);
          border-radius: .25rem;`
}

export const MakeDropdownItem = () => {
  return `text-decoration:none;
          padding: 4px; 
          cursor: pointer;
          display: block;
          width: 100%;
          clear: both;
          text-align: inherit;
          white-space: nowrap;
          background-color: transparent;
          border: 0;
          
          :hover {
            text-decoration: none;
            background-color: WhiteSmoke;
          }`
}

export const MakeDropdownDivider = () => {
  return `border-top: 1px solid Silver;
          margin-top: 5px;
          margin-bottom: 5px;`
}

export const MakeArrowDropDownIcon = () => {
  return `width: 20px;`
}
