export const MakeNavbar = () => {
  return `line-height: 72px;
          display: flex;
          position: relative;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;`
}

export const MakeBrand = () => {
  return `font-size: 1.25rem;
          line-height: 36px;
          display: inline-block;
          margin-right: 1rem;
          white-space: nowrap;

          &:focus,
          &:hover {
            text-decoration: none;
          }`
}

export const MakeToggle = () => {
  return `padding: .25rem .75rem;
          font-size: 1.25rem;
          line-height: 1;
          background-color: transparent;
          border: 1px solid transparent;
          border-radius: .25rem
          
          &:focus,
          &:hover {
            text-decoration: none
          }
          
          @media (min-width: 992px) {
            display: none;
          }`
}

export const MakeSearchToggle = () => {
  return `padding: .25rem .75rem;
          font-size: 1.25rem;
          line-height: 1;
          background-color: transparent;
          border: 1px solid transparent;
          border-radius: .25rem
          
          &:focus,
          &:hover {
            text-decoration: none
          }`
}

export const ToggleIcon = () => {
  return `display: inline-block;
          width: 1.5em;
          height: 1.5em;
          vertical-align: middle;
          content: "";
          background: no-repeat 50%;
          background-size: 100% 100%`
}

export const MakeCollapse = () => {
  return `flex-basis: 100%;
          flex-grow: 1;
          align-items: center;
          justify-content: space-between;
          
          
          &.content-left {
            justify-content: flex-start!important;
          }

          &.content-center {
            justify-content: flex-center!important;
          }

          &.content-right {
            justify-content: flex-end!important;
          }
          
          @media (min-width: 992px) {
            display: flex!important;
            flex-basis: auto;
          }`
}
