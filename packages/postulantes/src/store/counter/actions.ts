import { actionTypes, DecreaseCounter, IncreaseCounter } from './types'

export const decreaseCounter = (quantity: number): DecreaseCounter => {
  return {
    type: actionTypes.DECREASE,
    payload: { quantity },
  }
}

export const increaseCounter = (quantity: number): IncreaseCounter => {
  return {
    type: actionTypes.INCREASE,
    payload: { quantity },
  }
}
