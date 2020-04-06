import React from 'react'
import ContentLoader from 'react-content-loader'
import styled from 'styled-components'
import { times } from 'lodash'

const LogosCarrouselContainer = styled.div`
  width: 100%;
  max-width: 90px;
  display: inline-block;
  margin: 0 15px;
  border-radius: 36px;
  vertical-align: middle;
`

const CarrouselContainer = styled.div`
  width: 100%;
  height: 100%;
  height: 88px;
  background-color: #ffffff;
  margin-bottom: 5px;
  overflow: hidden;
`

const CarrouselWrapper = styled.div`
  width: 100%;
  line-height: 88px;
  margin: 0 auto;
  text-align: center;

  @media (min-width: 450px) {
    width: 86%;
  }

  @media (min-width: 700px) {
    width: 70%;
  }

  @media (min-width: 850px) {
    width: 62%;
  }

  @media (min-width: 1140px) {
    width: 75%;
  }
`

const CarrouselPlaceholder = () => (
  <LogosCarrouselContainer>
    <ContentLoader style={{ height: '32px', width: '108px' }} height={32} width={108}>
      <rect x="0" y="0" rx="18" ry="18" width="100" height="32" />
    </ContentLoader>
  </LogosCarrouselContainer>
)

const MyLoaderCarrousel = () => (
  <CarrouselContainer>
    <CarrouselWrapper>
      {times(7).map(index => (
        <CarrouselPlaceholder key={`carousel-empty-item-${index}`} />
      ))}
    </CarrouselWrapper>
  </CarrouselContainer>
)

export default MyLoaderCarrousel
