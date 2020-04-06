import React, { useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { AppStore } from '../store'

// useSelector and useDispatch Hooks that can be used instead of "connect"

// Import Action Creators
import { decrease, increase } from '../store/counter/actionsToDo'

// Action sync
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { increaseCounter, decreaseCounter } from '../store/counter/actions'

export const Counter = () => {
  const [quantity, setQuantity] = useState(1)
  // useSelector is analogous to connect’s mapStateToProps
  const counter = useSelector((store: AppStore) => store.counterStore.counter, shallowEqual)
  // shallowEqual: it uses strict object reference equality (===) to determine if components should re-render instead of shallow object comparison.

  // useDispatch replaces connect’s mapDispatchToProps but is lighter weight
  const dispatch = useDispatch()

  return (
    <>
      Counter: {counter}
      <input
        type="number"
        value={quantity}
        onChange={e => {
          setQuantity(+e.target.value)
        }}
      />
      <button type="button" onClick={() => dispatch(increase(quantity))}>
        +
      </button>
      <button type="button" onClick={() => dispatch(decrease(quantity))}>
        -
      </button>
    </>
  )
}
