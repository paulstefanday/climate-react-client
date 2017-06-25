import React, { Component } from 'react'
import { actionTypes } from '../store'

export const initState = {
  status:false
}

export const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.FINISHED_LOADING:
      return Object.assign({}, state, { status:false })
    case actionTypes.LOADING:
      return Object.assign({}, state, { status:true })
    default:return state
  }
}

class Loading extends React.Component {
  render() {
    return this.props.loading.status ? <p>Loading</p> : <p></p>
  }
}

export const html = Loading
