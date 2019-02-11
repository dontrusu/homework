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
  if(action.type === "MESSAGE_SENDING"){
    return{status: action.type, payload: action.payload, error: action.error}
  }
  if(action.type === "MESSAGE_SENT"){
    return{status: action.type, payload: action.payload, error: action.error}
  }
  if(action.type === "MESSAGE_FAIL"){
    return{status: action.type, payload: action.payload, error: action.error}
  }
  return state
}

const actionMessageSending = () => ({type: "MESSAGE_SENDING", payload: null, error: null})
const actionMessageSent = (payload) => ({type: "MESSAGE_SENT", payload, error: null})
const actionMessageFail = (error) => ({type: "MESSAGE_FAIL", payload: null, error})

const actionSend = (name, message) => {
  return async dispatch => {
    dispatch(actionMessageSending())
    try {
      let payload = jsonPost("http://students.a-level.com.ua:10012", {func: 'addMessage', nick: name, message: message})
      dispatch(actionMessageSent(payload))
    }
    catch(error){
      dispatch(actionMessageFail())
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
    this.state = {disabled: true, nick: "", message: ""}
  }

    handleClick = () => {
      this.props.onSend(this.nick.value, this.message.value)
      this.message.value = ""
      this.handleChange()
    }

    handleChange = () => {
      this.setState({disabled: !(this.nick.value && this.message.value)})
    }

    render(){
      console.log('<Component /> Props: ',this.props)
      return (
        <div>
          <input type = "text" placeholder = "nick" ref = {c => this.nick = c} onChange = {this.handleChange}/>
          <input type = "text" placeholder = "message" ref = {c => this.message = c} onChange = {this.handleChange}/>
          <button onClick = {(this.handleClick)} disabled = {this.state.disabled}>Send</button>
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
