import { bindActionCreators } from 'redux'
import { actionTypes } from './store'
import api from './api'

const login = (user) => dispatch => {
  dispatch({ type:actionTypes.LOADING })

  let hasError = false
  // else login user
  return api.login(user)
    .then(res => {
      if(res.status >= 300) hasError = true
      return res.json()
    })
    .then(res => {
      if(hasError) {
        dispatch({ type:actionTypes.FINISHED_LOADING })
        dispatch({ type:actionTypes.ADD_ERROR, error:res.message })
      } else {
        localStorage.setItem('climateToken', res.token)
        dispatch({ type:actionTypes.FINISHED_LOADING })
        dispatch({ type:actionTypes.LOGIN, user:res })
      }
    })
}

const logout = () => dispatch => {
  localStorage.removeItem('climateToken')
  return dispatch({ type:actionTypes.FORM_RESET })
}

const toggleLogin = () => dispatch => {
  return dispatch({ type:actionTypes.TOGGLE_LOGIN })
}

const checkToken = isEmpty => dispatch => {
  let hasError = false
  if(localStorage.getItem('climateToken') && isEmpty) {
    api.getUser().then(res => {
      if(res.status >=300) hasError=true;
      return res.json()
    })
    .then(res => {
      if(!hasError){
        dispatch({ type:actionTypes.LOGIN, user:res })
      }
    })
  }
}

export default (dispatch) => {
  return {
    checkToken:bindActionCreators(checkToken, dispatch),
    signup:bindActionCreators(login, dispatch),
    login:bindActionCreators(login, dispatch),
    logout:bindActionCreators(logout, dispatch),
    toggleLogin:bindActionCreators(toggleLogin, dispatch)
  }
}
