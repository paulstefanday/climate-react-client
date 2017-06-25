import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { Provider, connect } from 'react-redux'
import { reducer as auth } from './components/auth'
import { reducer as errors } from './components/errors'
import { reducer as loading } from './components/loading'
import actions from './actions'

export const actionTypes = {
  LOGIN:'LOGIN',
  LOGOUT:'LOGOUT',
  TOGGLE_LOGIN:'TOGGLE_LOGIN',
  FORM_UPDATE_VALUE: 'FORM_UPDATE_VALUE',
  FORM_RESET: 'FORM_RESET',
  LOADING:'LOADING',
  FINISHED_LOADING:'FINISHED_LOADING',
  ADD_ERROR:'ADD_ERROR'
}

export const reducer = combineReducers({
  auth,
  errors,
  loading,
})

export const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export const storeConnect = connect(state => state, actions)
