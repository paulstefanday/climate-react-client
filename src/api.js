import 'whatwg-fetch'
import Promise from 'promise-polyfill'
// To add to window
if (!window.Promise) {
  window.Promise = Promise;
}

const headers = new Headers();
headers.append("Content-Type", 'application/json');

function parseJSON(response) {
  return response.json()
}

export const base = 'http://app.climatetracker.org';

export const login = form => fetch(base + '/api/login', {
	method: 'POST',
  headers,
  credentials: 'include',
	body: JSON.stringify(form)
})


export const signup = form => fetch(base + '/api/signup', {
  method: 'POST',
  headers,
  credentials: 'include',
	body: JSON.stringify(form)
})


export const getUser = token => {
  const newHeaders = new Headers();
  newHeaders.append("Content-Type", 'application/json');
  newHeaders.append("Authorization", 'bearer ' + localStorage.getItem('climateToken'));

	return fetch(base + '/api/me', {
	  method: 'GET',
	  headers: newHeaders,
    credentials: 'include',
	})
}

export const hasAuth = () => localStorage.getItem('climateToken')
export const logout = () => localStorage.removeItem('climateToken')

export default {
	login, logout, hasAuth, signup, getUser, base
}
