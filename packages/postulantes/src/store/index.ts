import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

import { counterReducer } from './counter/reducers'
import aplicantReducer from './applicant/reducers'

const rootReducer = combineReducers({
  counterStore: counterReducer,
  applicantStore: aplicantReducer,
})

export type AppStore = ReturnType<typeof rootReducer>

function configureStore() {
  const middlewares = [thunkMiddleware]
  const middleWareEnhancer = applyMiddleware(...middlewares)
  const store = createStore(rootReducer, composeWithDevTools(middleWareEnhancer))
  return store
}

export const store = configureStore()
