import { decreaseCounter, increaseCounter } from './actions'

// --------------------- ACTION CREATORS
export const increase = (quantity: number) => {
  return async (dispatch: Function) => {
    await sleep(2000)
    dispatch(increaseCounter(quantity))
  }
}

export const decrease = (quantity: number) => {
  return async (dispatch: Function) => {
    await sleep(2000)
    dispatch(decreaseCounter(quantity))
  }
}

// aux func
const sleep = (ms: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}
