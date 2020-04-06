import React from 'react'
import ContentLoader from 'react-content-loader'
import styled from 'styled-components'

const BannerContainer = styled.div`
  width: 100%;
  height: 264px;
  background-color: rgba(0, 128, 185, 0.16);
`

const BannerPlaceholder = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`

const LoaderBanner = () => (
  <BannerContainer>
    <BannerPlaceholder>
      <ContentLoader style={{ height: '264px', width: '600px' }} height={264} width={600} primaryColor="#ffffff">
        <circle x="0" y="0" cx="310" cy="60" r="30" width="72" height="72" />
        <rect x="145" y="102" rx="0" ry="0" width="332" height="24" />
        <rect x="200" y="146" rx="0" ry="0" width="212" height="16" />
        <rect x="0" y="202" rx="0" ry="0" width="597" height="14" />
      </ContentLoader>
    </BannerPlaceholder>
  </BannerContainer>
)

export default LoaderBanner
