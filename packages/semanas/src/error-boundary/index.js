/* eslint-disable react/jsx-filename-extension, no-console, react/forbid-prop-types */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

// Error
const errorImageUrl = 'https://careers.avanade.com/jscore/images/http/fatal.png'

export default class ErrorBoundary extends PureComponent {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error(`Error desde did catch de ErrorBoundary. Error : ${error} , info : ${errorInfo.componentStack}`)
  }

  render() {
    const { renderOnError, children } = this.props
    const { hasError } = this.state

    if (hasError) {
      return renderOnError()
    }

    return children
  }
}

const DefaultErrorScreen = () => (
  <div className="ErrorScreen" style={{ textAlign: 'center' }}>
    <img src={errorImageUrl} alt="error" />
    <h2>Algo no salió bien.</h2>
  </div>
)

ErrorBoundary.propTypes = {
  renderOnError: PropTypes.any,
  children: PropTypes.node.isRequired,
}

ErrorBoundary.defaultProps = {
  renderOnError: DefaultErrorScreen,
}
