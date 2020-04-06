export enum actionTypes {
  INCREASE = 'INCREASE',
  DECREASE = 'DECREASE',
}

export interface CounterState {
  counter: number
}

export interface IncreaseCounter {
  type: typeof actionTypes.INCREASE
  payload: { quantity: number }
}

export interface DecreaseCounter {
  type: typeof actionTypes.DECREASE
  payload: { quantity: number }
}

export type CounterAction = IncreaseCounter | DecreaseCounter
