import React from 'react'
import { connect } from 'react-redux'
import { decrease, increase } from '../store/counter/actionsToDo'
import { AppStore } from '../store'

export interface CounterProps {
  onIncrease?: Function
  onDecrease?: Function
  counter?: number
}

interface ComponentState {
  quantity: number
}
export class CounterComponent extends React.Component<CounterProps, ComponentState> {
  constructor(props) {
    super(props)
    this.state = { quantity: 1 }
  }

  public setQuantity = quantity => {
    this.setState({ quantity })
  }

  public render() {
    return (
      <>
        Counter: {this.props.counter}
        <input
          type="number"
          value={this.state.quantity}
          onChange={e => {
            // add + operator to transform string to int
            this.setQuantity(+e.target.value)
          }}
        />
        <button
          type="button"
          onClick={() => (this.props.onIncrease ? this.props.onIncrease(this.state.quantity) : null)}
        >
          +
        </button>
        <button
          type="button"
          onClick={() => (this.props.onDecrease ? this.props.onDecrease(this.state.quantity) : null)}
        >
          -
        </button>
      </>
    )
  }
}

const mapStateToProps = (store: AppStore) => ({
  counter: store.counterStore.counter,
})
const mapDispatchToProps = (dispatch: Function) => {
  return {
    onIncrease: quantity => dispatch(increase(quantity)),
    onDecrease: quantity => dispatch(decrease(quantity)),
  }
}

export const Counter: React.ComponentType<CounterProps> = connect(mapStateToProps, mapDispatchToProps)(CounterComponent)
