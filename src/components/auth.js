import React from 'react'
import { actionTypes, store } from '../store'

export const initState = {
  user: {},
  fields: {},
  showLogin:true,
  loginFields: [
    ['username'],
    ['password', 'password']
  ],
  signupFields: [
    ['username'],
    ['password', 'password'],
    ['dob', 'date'],
    ['country'],
    ['firstName'],
    ['lastName']
  ]
}

export const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_LOGIN:
      return Object.assign({}, state, { showLogin:!state.showLogin })
    case actionTypes.FORM_UPDATE_VALUE:
      return Object.assign({}, state, {
        fields: Object.assign({}, state.fields, {
          [action.name]: action.value
        })
      });
    case actionTypes.FORM_RESET:
      return Object.assign({}, initState, { showLogin: state.showLogin });
    case actionTypes.LOGIN:
      return Object.assign({}, state, { user:action.user })
    default:return state
  }
}

class Auth extends React.Component {

  componentDidMount () {
    this.props.checkToken(isEmpty(this.props.auth.user))
	}

	render() {
    const {
      toggleLogin, children, login, signup, auth: { user, showLogin, fields }
    } = this.props
    const inputs = this.props.auth[`${showLogin ? 'login' : 'signup' }Fields`]
    const submit = showLogin ? login : signup
    const title = showLogin ? 'Login' : 'Signup'
    const input = f => <input
      required="true"
      type={f[1] || 'text'}
      placeholder={f[0]}
      value={this.props.auth.fields[f[0]]}
      onChange={e => store.dispatch({ type: actionTypes.FORM_UPDATE_VALUE, name:f[0], value:e.target.value }) } />

		return !isEmpty(user) ? <div>{children}</div> : <div>
			<h1>{title}</h1>
			{inputs.map(input)}
      <button onClick={e => submit(fields)}>{title}</button>
      <button onClick={toggleLogin}>Or {!showLogin ? 'Login' : 'Signup'}</button>
    </div>
	}

}

export const html = Auth

// Helper functions
function isEmpty(object) {
    for(var key in object) {
        if(object.hasOwnProperty(key))
            return false;
    }
    return true;
}
