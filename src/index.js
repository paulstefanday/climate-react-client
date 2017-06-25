import React, { Component } from 'react'
import { store, storeConnect } from './store'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

// Components
import { html as Auth } from './components/auth'
import { html as Loading } from './components/loading'
import { html as Errors } from './components/errors'

// Styles
import './index.css'

const AuthPage = storeConnect(Auth)
const LoadingPage = storeConnect(Loading)
const ErrorsPage = storeConnect(Errors)

// Content
class Home extends React.Component {
  render() {
    return <div>
      <h1>Welcome {this.props.auth.user.username}</h1>
      <button onClick={this.props.logout}>Logout</button>
    </div>
  }
}
const HomePage = storeConnect(Home)

// Render app
ReactDOM.render(
  <Provider store={store}>
    <div>
      <ErrorsPage/>
      <LoadingPage/>
      <AuthPage>
        <HomePage/>
      </AuthPage>
    </div>
  </Provider>,
  document.getElementById('root')
)
