import React, { Component } from 'react'
import { actionTypes } from '../store'

export const initState = {
  messages:[]
}

export const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.ADD_ERROR:
      return Object.assign({}, state, { messages:[action.error, ...state.messages]})
    default:return state
  }
}

class Errors extends React.Component {
  render() {
    return <div>
      {this.props.errors.messages.map(e => <p>{e}</p>)}
    </div>
  }
}

export const html = Errors
