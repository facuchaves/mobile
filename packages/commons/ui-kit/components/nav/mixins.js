export const MakeNav = () => {
  return `display: flex;
          flex-direction: column;
          padding-left: 0;
          margin-bottom: 0;
          list-style: none;

          @media (min-width: 992px) {
            flex-direction: row;
          }`
}

export const MakeNavItem = () => {
  return `padding-right: .5rem;
          padding-left: .5rem;`
}
