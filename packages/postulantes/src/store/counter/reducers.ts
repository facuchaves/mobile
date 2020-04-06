import { updateObject } from '../utility'
import { actionTypes, CounterAction, CounterState } from './types'

const initialState: CounterState = {
  counter: 0,
}

export const counterReducer = (state = initialState, action: CounterAction): CounterState => {
  switch (action.type) {
    case actionTypes.INCREASE:
      // using utility
      return updateObject<CounterState>(state, { counter: state.counter + action.payload.quantity })
    case actionTypes.DECREASE:
      return {
        ...state,
        counter: state.counter - action.payload.quantity,
      }
    default:
      return state
  }
}
