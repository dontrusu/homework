import React, { Component } from 'react';
import './App.css';

function jsonPost(url, data){
    return fetch(url, {
        method: "POST",
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .catch(error => new Error('jsonPost failed'))
}


class Inputs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {disabled: true}
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

class ChatHistory extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className = "chat">
        {this.props.message.reverse().map((object, i) =>  <ChatMessage nick = {object.nick} message = {object.message} key = {i} />)}
      </div>
      )
  }
}

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {msg: []}
    this.showMessages = this.showMessages.bind(this);
  }
  showMessages() {
    var data = jsonPost("http://students.a-level.com.ua:10012", {func: "getMessages", messageId: this.state.msg.nextMessageId})
    {data.then((data) => this.setState({msg: data.data}))}
  }
  componentDidMount(){
    setInterval(this.showMessages, 2000)
  }

  render() {
    return(
        <ChatHistory message = {this.state.msg} /> 
        )
  }
}


let App = (props) => {
  return(
    <div className = "app">
      <Inputs onSend = {(n,m)=> jsonPost("http://students.a-level.com.ua:10012", {func: 'addMessage', nick: n , message: m })}/>
      <Chat />
    </div>
  )
}

export default App;
