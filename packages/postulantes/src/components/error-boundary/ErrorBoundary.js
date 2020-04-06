import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export class ErrorBoundary extends PureComponent {
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
  <div>
    <h2>Algo no salió bien</h2>
  </div>
)

ErrorBoundary.propTypes = {
  renderOnError: PropTypes.func,
  children: PropTypes.node.isRequired,
}

ErrorBoundary.defaultProps = {
  renderOnError: DefaultErrorScreen,
}
