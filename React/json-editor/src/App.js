import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider, connect } from 'react-redux';
import brace from 'brace';
import AceEditor from 'react-ace';
import './App.css';

import 'brace/mode/javascript';
import 'brace/mode/json';
import 'brace/theme/solarized_light';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight, faCaretDown } from '@fortawesome/free-solid-svg-icons'

library.add(faCaretRight, faCaretDown)


let store = createStore((state, action) => {
  if (state === undefined) {
    return {value :""}
  }
  if (action.type === "CHANG_VALUE"){
    return {
      value: action.value
    }
  }
  return state
})

function actionChangeField(value) {
  return {
    type: "CHANG_VALUE",
    value: value
  }
}

function actionObjectData(key, value) {
  return {
    type: "SEND_DATA",
    key: key,
    value: value
  }
}

function idGenerator(key){
  return
}

function parseObject(obj){ // передается распарсенный объект 
  let type = obj.constructor.name
  if(type === ("Object") || type ===("Array")){ // если объект или массив, перебираем ключи
    var arr = []  // массив в который будет записываться структура собраная из компонентов
    for (let key in obj){
      let keyType = obj[key].constructor.name   
      if(keyType === ("Object") || keyType ===("Array")){ 
        let nestedArr = parseObject(obj[key])  // если ключ является объектом или массивом, переходим к перебору его ключей 
                                              //и записываем вернувшийся массив
        let objectLength = Object.keys(obj[key]).length  // узнаем число ключей для отрисовки рядом с именем объекта
        arr.push(<ObjectComponent objectKey={key} objectValue={nestedArr} objectLength={objectLength} />) // компонент в котрый передается имя ключа
                                                                                                          // и массив вложеных элементов 
      }else{ // если не объект или массив, записывам как простую строку 
        arr.push(<div>
                  <li>
                    <span contentEditable={true}>{key}</span>
                    <span contentEditable={false}>:</span>
                    <span contentEditable={true}>{obj[key]}</span>
                  </li>
                </div>)
      }
    }
    return arr 
  }
}

class JsonEditor extends React.Component {

  handleChange = (value) => {
    try {
      JSON.parse(`${value}`)    
      this.props.actionChangeField(value)
    }catch(err){
      console.log(err)
    }
  }

  render() {
    return(
      <div>
        <AceEditor 
          mode = "json"
          theme = "solarized_light"
          name = "jsonEditor"
          value = {this.props.value}
          onChange = {this.handleChange}
        />
      </div>
    )
  }
}

let result

class JsEditor extends React.Component {

  render() {

    let value = this.props.value !== "" ? JSON.parse(this.props.value) : "" // если поле json редактора пустое, то парсить нельзя
    let result = parseObject(value)  // распарсенный объект передаем в функцию для отрисовки 
    console.log(result)

    return(
      <div className="jsEditor">
        {result}
      </div>
    )
  }
}



class ObjectComponent extends React.Component {
  constructor(props){
    super(props)
  }

  state = {show: "caret-right", display: "none"}

  handleClick = () => {
    if (this.state.show === "caret-right"){                        
      this.setState({show: 'caret-down', display: "block"})        // для отображения и скрытия вложености 
    }else{
      this.setState({show: "caret-right", display: "none"})
    }
  }

  render(){
    return(
      <div>
        <li contentEditable={false}>
          <button onClick = {this.handleClick}>
            <FontAwesomeIcon icon = {this.state.show} /> 
          </button>
          <span contentEditable={true}>{this.props.objectKey}</span>
          <span contentEditable={false}>{`  {${this.props.objectLength}}`}</span>
          <div style={{display: this.state.display}}>
            <ul>
              <span contentEditable={false}>{this.props.objectValue}</span>
            </ul>
          </div>
        </li>
      </div>
    )
  }
}


let mapSTP = state => ({value: state.value})
let mapDTP = {actionChangeField}

JsonEditor = connect(mapSTP, mapDTP)(JsonEditor)
JsEditor = connect(mapSTP, mapDTP)(JsEditor)
ObjectComponent = connect(mapSTP, mapDTP)(ObjectComponent)

let App = (props) => {
  return(
    <Provider store = {store}>
      <JsonEditor />
      <div className = "space"></div>
      <JsEditor />
    </Provider>
  )
}

export default App;
