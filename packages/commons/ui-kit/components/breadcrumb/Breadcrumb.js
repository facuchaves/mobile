import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.nav`
  padding: 15px 0;
`
/* TODO: cambiar por componentes del UI kit */
const BackLink = styled.a`
  font-weight: bold;
  color: grey !important;
  padding: 10px;
  cursor: pointer;
`

const Separator = () => <span>|</span>

const Link = styled.a`
  padding: 10px;
  font-weight: bold;
  color: orange;
`

const CaretRight = () => <span>{'>'}</span>

const Title = styled.a`
  padding: 10px;
  font-weight: bold;
  color: black;
`

export const Breadcrumb = ({ links = [], currentTitle, onBackLinkClick }) => (
  <Container>
    {onBackLinkClick && (
      <>
        <BackLink onClick={onBackLinkClick}>{'< Volver'}</BackLink>
        <Separator />
      </>
    )}
    {links.map(({ title, link }, index) => {
      const isNotLastItem = index < links.length - 1
      const showCaret = isNotLastItem || currentTitle

      return (
        <Fragment key={title}>
          <Link href={link}>{title}</Link>
          {showCaret && <CaretRight />}
        </Fragment>
      )
    })}
    {currentTitle && <Title>{currentTitle}</Title>}
  </Container>
)

export const BreadcrumbLinkPropType = PropTypes.shape({
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
})

Breadcrumb.propTypes = {
  links: PropTypes.arrayOf(BreadcrumbLinkPropType).isRequired,
  currentTitle: PropTypes.string,
  onBackLinkClick: PropTypes.func,
}

Breadcrumb.defaultProps = {
  currentTitle: null,
  onBackLinkClick: null,
}
