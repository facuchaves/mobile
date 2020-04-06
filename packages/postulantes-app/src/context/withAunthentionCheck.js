/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */
import React from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'
import { Root } from 'native-base'
import { User } from '../api/session-service'
import PreLoginScreen from '../screens/Login/PreLoginSreen'

// eslint-disable-next-line import/prefer-default-export
export const withAunthentionCheck = BaseComponent => {
  class WrappedComponent extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        user: false,
      }

      /* this.state = store.getState()

      store.subscribe(() => {
        this.setState(store.getState())
      }) */
    }

    componentDidMount = async () => {
      this.setState({ user: await User.checkLogin() })
    }

    render() {
      if (this.state.user) {
        return (
          <Root>
            <BaseComponent {...this.props} />
          </Root>
        )
      }
      return <PreLoginScreen />
    }
  }

  // TODO: agregar hoist non statics
  return hoistNonReactStatics(WrappedComponent, BaseComponent)
}
