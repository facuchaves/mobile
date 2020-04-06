import React from 'react'
import ContentLoader from 'react-content-loader'
import styled from 'styled-components'

const Placeholder = styled.div`
  width: 100%;
  max-width: 400px;
  background-color: #fff;
  padding: 20px 15px;
  margin: 0 auto 10px;
  box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.16);
  border-radius: 3px;

  @media (max-width: 768px) {
    padding: 25px 15px;
  }
`

const CardPlaceholder = () => (
  <Placeholder>
    <ContentLoader style={{ height: '100%', maxHeight: '70px', width: '100%', maxWidth: '400px' }} speed={2}>
      <rect x="0" y="0" rx="0" ry="0" width="112" height="140" />
      <rect x="122" y="0" rx="0" ry="0" width="180" height="24" />
      <rect x="122" y="45" rx="0" ry="0" width="56" height="20" />
      <rect x="122" y="85" rx="0" ry="0" width="84" height="16" />
      <rect x="214" y="85" rx="0" ry="0" width="56" height="16" />
    </ContentLoader>
  </Placeholder>
)

export default CardPlaceholder
