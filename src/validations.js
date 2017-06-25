import validate from "validate.js"
import _ from 'lodash'

const fields = {
  username: {
    presence: true,
		email: true,
  },
	usernameConfirm: { equality: "username" },
	firstName: { presence:true },
	lastName: { presence:true },
	country: {
		inclusion:[],
		presence:true
	},
	dob: {
		presence: true,
		datetime: true
	},
  password: {
    presence: true,
    length: {
      minimum: 6,
      message: "must be at least 6 characters"
    }
  },
	passwordConfirm: {
    equality: "password"
  }
}

export const login = form => validate(form, _.pick(fields, [
	'username',
	'password'
]))

export const signup = form => validate(form, fields)

export const reset = form => validate(form, _.pick(fields, ['username']))

export default {
  reset, signup, login, 
}
