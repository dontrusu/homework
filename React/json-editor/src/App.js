import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider, connect } from 'react-redux';
import brace from 'brace';
import AceEditor from 'react-ace';
import './App.css';

import { Dropdown } from 'semantic-ui-react'

import 'brace/mode/javascript';
import 'brace/mode/json';
import 'brace/theme/solarized_light';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight, faCaretDown, faAlignJustify, faAlignLeft, faBox } from '@fortawesome/free-solid-svg-icons'

library.add(faCaretRight, faCaretDown, faAlignJustify, faAlignLeft, faBox)
var objectPath = require("object-path");


let store = createStore((state, action) => {
  if (state === undefined) {
    return {value :"", symbol: "r"}
  }
  if (action.type === "CHANG_VALUE"){
    return {
      value: action.value,
      symbol: action.symbol
    }
  }
  return state
})

function actionChangeField(value, symbol) {
  return {
    type: "CHANG_VALUE",
    value: value,
    symbol: symbol
  }
}


function parseObject(obj, id = "" ){ // передается распарсенный объект 
  let type = obj.constructor.name
  if(type === ("Object") || type ===("Array")){ // если объект или массив, перебираем ключи
    var arr = []  // массив в который будет записываться структура собранная из компонентов
    for (let key in obj){
      var newId = id + `.${key}`;
      let keyType = obj[key].constructor.name   
      if(keyType === ("Object") || keyType ===("Array")){ 
        let nestedArr = parseObject(obj[key], newId)  // если ключ является объектом или массивом, переходим к перебору его ключей 
                                              //и записываем вернувшийся массив
        let objectLength = Object.keys(obj[key]).length  // узнаем число ключей для отрисовки рядом с именем объекта
        arr.push(<ObjectComponent objectKey={key}                 // компонент в котрый передается имя ключа
                                  objectValue={nestedArr}         // и массив вложенных элементов 
                                  objectLength={objectLength} 
                                  objectType={keyType}
                                  objectId={newId}/>)                                                                                               
      }else{ // если не объект или массив, записывам как простую строку 
 
        newId = id + `.${key}`;

        arr.push(<StringComponent stringKey={key} 
                                  stringValue={obj[key]}
                                  keyType={keyType} 
                                  parentType={type} 
                                  stringId={newId}/>)
      }
    }
    return arr 
  }
}

class JsonEditor extends React.Component {

  state = {value: this.props.value, error: "false"}

  handleChange = (value) => {
    try {
      JSON.parse(`${value}`)    
      this.props.actionChangeField(value, "r")
      this.setState({value: value, error: "false"})
    }catch(err){
      this.setState({value: value, error: "true"})
      console.log(err)
    }
    this.setState({value: value})
  }

  handleRegularClick = () => {
      let a = this.props.value !== "" ? JSON.parse(this.props.value) : ""
      let regularJson = JSON.stringify(a)
      this.setState({value: regularJson})
      this.props.actionChangeField(regularJson, "r")
    }

  handleBeautifulClick = () => {
    let a = this.props.value !== "" ? JSON.parse(this.props.value) : ""
    let beautifulJson = JSON.stringify(a, null, "\t")
    this.setState({value: beautifulJson})
    this.props.actionChangeField(beautifulJson, "b")
  }

  render() {
    return(
      <div className="jsonEditor">
        <div className = "formatButtonContainer">
          <button onClick = {this.handleBeautifulClick} 
                  title = "Format JSON data, with proper indentation and line feeds"
                  className = "formatButton">
            <FontAwesomeIcon icon = 'align-left' />
          </button>
          <button onClick = {this.handleRegularClick}
                  title = "Compact JSON data, remove all whitespaces"
                  className = "formatButton">
            <FontAwesomeIcon icon = 'align-justify' />
          </button> 
        </div>
        <AceEditor 
          mode = "json"
          theme = "solarized_light"
          name = "jsonEditor"
          value = {this.state.error === "true" ? this.state.value : this.props.value}
          wrapEnabled = {true}
          onChange = {this.handleChange}
          height = "55em"
          width = "55em"
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

    return(
      <div className = "jsEditor">
        <div className = "border"></div>
        <div className = "objectField">  
          {result}
        </div>
      </div>
    )
  }
}

let trigger = (
    <span>
      <FontAwesomeIcon icon = "box" />
    </span>
  )

class DropdownMenu extends React.Component {
  constructor(props){
    super(props)
  }

  addObject = () => {
    var obj = JSON.parse(this.props.value) 
    let id = this.props.objectId
    var correctId = id.slice(1)
    var emptyObj = {}
    objectPath.set(obj, correctId + ".", emptyObj);
    if(this.props.symbol === "r"){
      this.props.actionChangeField(JSON.stringify(obj))
    }else{
      this.props.actionChangeField(JSON.stringify(obj, null, "\t"))
    }
  }

  handleRemove = () => {
    var obj = JSON.parse(this.props.value) 
    let id = this.props.objectId
    var correctId = id.slice(1)
    objectPath.del(obj, correctId);
    if(this.props.symbol === "r"){
      this.props.actionChangeField(JSON.stringify(obj))
    }else{
      this.props.actionChangeField(JSON.stringify(obj, null, "\t"))
    }
  }

  addString = () => {
    var obj = JSON.parse(this.props.value) 
    let id = this.props.objectId
    var correctId = id.slice(1)
    var emptyStr = ""
    objectPath.set(obj, correctId + ".", emptyStr);
    if(this.props.symbol === "r"){
      this.props.actionChangeField(JSON.stringify(obj))
    }else{
      this.props.actionChangeField(JSON.stringify(obj, null, "\t"))
    }
    console.log(obj)
  }

  render(){
    let menu 
    if(this.props.stringType !== undefined){
      menu = menu
    }else{
      menu = <><Dropdown.Item text='Add Object' onClick={this.addObject} />
             <Dropdown.Item text='Add Array' />
             <Dropdown.Item text='Add String' onClick={this.addString}/></>
    }

    return(
      <Dropdown trigger={trigger} icon={null} className = "dropdown" onClick={()=>console.log(this.props.stringType)}>
        <Dropdown.Menu>
          {menu}
          <Dropdown.Item text='Remove' onClick={this.handleRemove}/>
        </Dropdown.Menu>
      </Dropdown>
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
      this.setState({show: 'caret-down', display: "block"})        // для отображения и скрытия вложенности 
    }else{
      this.setState({show: "caret-right", display: "none"})
    }
  }

  handleChange = () => {
    var editable = this.objectName; //срока с именем объекта на который кликнули
    var objectName = editable.innerHTML //имя объекта(текст внутри)
    var obj = JSON.parse(this.props.value) 
    let id = this.props.objectId //путь к выбраному полю
    var correctId = id.slice(1) //без точки вначале
    let lastIndex = correctId.lastIndexOf(".")
    let newId 
    if(correctId.substring(0, lastIndex) === ""){
      newId = correctId.substring(0, lastIndex) + objectName
    }else{
      newId = correctId.substring(0, lastIndex) + "." + objectName
    }
    if(correctId === newId){return}
    var currentObj = objectPath.get(obj, correctId)
    objectPath.set(obj, newId, currentObj)
    objectPath.del(obj, correctId)
    if(this.props.symbol === "r"){
      this.props.actionChangeField(JSON.stringify(obj))
    }else{
      this.props.actionChangeField(JSON.stringify(obj, null, "\t"))
    }
  }

  render(){
    let length 
    if(this.props.objectType === "Array"){
      length = `  [${this.props.objectLength}]`
    }else{
      length = `  {${this.props.objectLength}}`
    }

    return(
        <li>
          <DropdownMenu objectId={this.props.objectId}/>
          <button onClick = {this.handleClick}>
            <FontAwesomeIcon icon = {this.state.show} /> 
          </button>
          <span contentEditable={true} 
                onBlur={this.handleChange} 
                ref={ref => this.objectName = ref}>
            {this.props.objectKey}
          </span>
          <span contentEditable={false}>{length}</span>
          <ul style={{display: this.state.display}}>
            {this.props.objectValue}
          </ul>
        </li>
    )
  }
}

class StringComponent extends React.Component {
  constructor(props){
    super(props)
  }

  handleValueChange = () => {
    var editable = this.keyValue;
    var keyValue = editable.innerHTML
    var obj = JSON.parse(this.props.value) 
    let id = this.props.stringId
    var correctId = id.slice(1)
    objectPath.set(obj, correctId, keyValue)
    if(this.props.symbol === "r"){
      this.props.actionChangeField(JSON.stringify(obj))
    }else{
      this.props.actionChangeField(JSON.stringify(obj, null, "\t"))
    }
  }

  handleKeyChange = () => {
    var editable = this.keyName;
    var keyName = editable.innerHTML
    var obj = JSON.parse(this.props.value) 
    let id = this.props.stringId
    var correctId = id.slice(1)
    let lastIndex = correctId.lastIndexOf(".")
    let newId 
    if(correctId.substring(0, lastIndex) === ""){
      newId = correctId.substring(0, lastIndex) + keyName
    }else{
      newId = correctId.substring(0, lastIndex) + "." + keyName
    }
    if(correctId === newId){return}
    var currentObj = objectPath.get(obj, correctId)
    objectPath.set(obj, newId, currentObj)
    objectPath.del(obj, correctId)
    if(this.props.symbol === "r"){
      this.props.actionChangeField(JSON.stringify(obj))
    }else{
      this.props.actionChangeField(JSON.stringify(obj, null, "\t"))
    }
  }

  render(){

    let value
    let editable

    if(this.props.keyType === "Boolean"){
      value = <><input type="checkbox" 
                       checked={this.props.stringValue}/>
                <span className="Boolean">{`${this.props.stringValue}`}</span></>
    }else{
      value = <span contentEditable={true} 
                    className={this.props.keyType}
                    onBlur={this.handleValueChange}
                    ref={ref => this.keyValue = ref}>
                {this.props.stringValue}
              </span>
    }

    if(this.props.parentType === "Array"){
      editable = false
    }else{
      editable = true
    }

    return(
        <li>
          <DropdownMenu objectId={this.props.stringId} stringType={this.props.keyType}/>
          <span contentEditable={editable} 
                onBlur={this.handleKeyChange}
                ref={ref => this.keyName = ref}>
            {this.props.stringKey}
          </span>
          <span contentEditable={false}> : </span>
          {value}
        </li>
    )
  }
}

let mapSTP = state => ({value: state.value, symbol: state.symbol})
let mapDTP = {actionChangeField}

JsonEditor = connect(mapSTP, mapDTP)(JsonEditor)
JsEditor = connect(mapSTP, mapDTP)(JsEditor)
ObjectComponent = connect(mapSTP, mapDTP)(ObjectComponent)
StringComponent = connect(mapSTP, mapDTP)(StringComponent)
DropdownMenu = connect(mapSTP, mapDTP)(DropdownMenu)

let App = (props) => {
  return(
    <Provider store = {store}>
      <JsonEditor />
      <JsEditor />
    </Provider>
  )
}

export default App;
