import {Provider, connect}   from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux';

import React, { Component } from 'react';
import './App.css';

import thunk from 'redux-thunk';

function jsonPost(url, data){
    return fetch(url, {
        method: "POST",
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .catch(error => new Error('jsonPost failed'))
}


const chatReducer = (state, action) => {
  if (state === undefined) {
    return {status: null, payload: {data: []}}
  }
  if (action.type === "SET_STATUS"){
    return{status: action.status, payload: action.payload, error: action.error}
  }

  return state;
}

const actionDefault     = () => ({ type: 'SET_STATUS', status: 'DEFAULT', payload: null, error: null })
const actionPending     = () => ({ type: 'SET_STATUS', status: 'PENDING', payload: {data: []}, error: null })
const actionResolved    = payload => ({ type: 'SET_STATUS', status: 'RESOLVED', payload, error: null })
const actionRejected    = error => ({ type: 'SET_STATUS', status: 'REJECTED', payload: null, error })

/*const actionGetMsg   = () => {
    return dispatch => { 
        let promise = jsonPost("http://students.a-level.com.ua:10012", {func: 'getMessages', messageId:0})
        dispatch(actionPending())
        promise.then(
            data => dispatch(actionResolved(data)),
            error => dispatch(actionRejected(error))
        )
    }
}*/

const actionGetMsg = () => {
    let promise = jsonPost("http://students.a-level.com.ua:10012", {func: 'getMessages', messageId:0})
    promise.then(
        data => store.dispatch(actionResolved(data)),
        error => store.dispatch(actionRejected(error))
    )

    return actionPending()
}

setInterval(actionGetMsg, 2000)

const messageReducer = (state, action) => {
  if(state === undefined) {
    return {status: null}
  }
  if(action.type === "SET_STATUS"){
    return{status: action.status, payload: action.payload, error: action.error}
  }
  return state
}


const actionSend = (name, message) => {
  return async dispatch => {
    dispatch(actionPending())
    try {
      let payload = jsonPost("http://students.a-level.com.ua:10012", {func: 'addMessage', nick: name, message: message})
      dispatch(actionResolved(payload))
    }
    catch(error){
      dispatch(actionRejected())
    }
    finally {
      dispatch(actionDefault())
    }
  }
}

const reducers = combineReducers({
  chat: chatReducer,
  newMessage: messageReducer
})

const store = (createStore(reducers, applyMiddleware(thunk)))
//store.subscribe(() => console.log(store.getState()))



class Inputs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {nick: "", message: ""}
  }

    handleClick = () => {
      this.props.onSend(this.state.nick, this.state.message)
    }
    render(){
      let mapStatusToColor = {
      RESOLVED: 'lightgreen',
      REJECTED: 'red',
      PENDING: 'lightgray',
      DEFAULT: '',
    }
      console.log('<Component /> Props: ',this.props)
      return (
        <div>
          <input type = "text" placeholder = "nick" value = {this.state.nick} onChange = {e => this.setState({nick: e.target.value})}/>
          <input type = "text" placeholder = "message" value = {this.state.message} style={{backgroundColor: mapStatusToColor[this.props.status]}} onChange = {e => this.setState({message: e.target.value})}/>
          <button onClick = {(this.handleClick)} disabled = {this.props.status === 'PENDING'}>Send</button>
        </div>
        )
  }
}

let ChatMessage = (props) => {
  return(
    <div>
      <b>{props.nick}: </b>
       {props.message}
    </div>
    )
}

let ChatHistory = (props) => {
  return (
    <div className = "chat">
      {props.message.reverse().map((object, i) =>  <ChatMessage nick = {object.nick} message = {object.message} key = {i} />)}
    </div>
    )
}

class Chat extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    //console.log('<Component /> Props: ',this.props)
    return(
      <ChatHistory message = {this.props.messages.data} /> 
    )
  }
}

let mapStateToProps = state => ({messages: state.chat.payload});
let mapDispatchToProps =  {actionGetMsg}
let statusToProps = state => ({status: state.newMessage.status})

Inputs = connect(statusToProps, {onSend: actionSend})(Inputs)
Chat = connect(mapStateToProps, mapDispatchToProps)(Chat)

let App = (props) => {
  return(
    <Provider store = {store}>
      <div className = "app">
        <Inputs />
        <Chat />
      </div>
    </Provider>
  )
}

export default App;
