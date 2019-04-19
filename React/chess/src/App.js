import React, { Component } from 'react';
import './App.css';

import {Provider, connect}   from 'react-redux';
import {createStore, combineReducers} from 'redux';

import io from 'socket.io-client';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChessPawn, faChessBishop, faChessKing, faChessKnight, faChessQueen, faChessRook} from '@fortawesome/free-solid-svg-icons'

library.add(faChessPawn, faChessBishop, faChessKing, faChessKnight, faChessQueen, faChessRook)

let boardReducer = (state, action) => {
  if (state === undefined){
    return {board: [
      ['wr','wn','wb','wq','wk','wb','wn','wr'],
      ['wp','wp','wp','wp','wp','wp','wp','wp'],
      [' ',' ',' ',' ',' ',' ',' ',' '],
      [' ',' ',' ',' ',' ',' ',' ',' '],
      [' ',' ',' ',' ',' ',' ',' ',' '],
      [' ',' ',' ',' ',' ',' ',' ',' '],
      ['bp','bp','bp','bp','bp','bp','bp','bp'],
      ['br','bn','bb','bq','bk','bb','bn','br'] ],
      turn: "w"}
  }
  if (action.type === "CHANGE_BOARD" && action.board){
    return{board: action.board,
          turn: action.turn}
  }
  return state;
}

let menuReducer = (state, action) => {
  if (state === undefined){
    return{
      showBoard: {display: "none"}
    }
  }
  if (action.type === "CONNECT_ON"){
    return{
      showBoard: {display: "none"}
    }
  }
  if (action.type === "CONNECT_OFF"){
    return{
      showBoard: {display: "none"}
    }
  }
  if(action.type === "NEW_GAME"){
    return{
      showBoard: {display: "block"}
    }
  }
  return state
}

let gamersReducer = (state, action) => {
   if (state === undefined){
    return{
      gamers: []
    }
  }
  if (action.type === "GAMERS"){
    return{
      gamers: action.gamers
    }
  }
  return state;
}

function actionGamers(gamers){
  return {
    type: 'GAMERS',
    gamers: gamers
  }
}

function actionConnectOn(nickValue, nicksDiv){
  socket = io('http://localhost:4000') //connect
      //socket = io() //connect
  socket.on('hi',({id}) => ourId = id) //our id from serverside 
  socket.emit('conn', {nick: nickValue}) //our nick to  serverside
  socket.on('startGame', ({inGameWith, turn}) => { //when someone else accept our game
            enemyId = inGameWith;
            /*gameDiv.style.display = 'block';*/
            })
  socket.on('gamers',gamers => store.dispatch(actionGamers(gamers)))
  socket.on('turn', data => store.dispatch(actionChangeBoard(data, null,null, false)))
  return{
    type: "CONNECT_ON"
  }
}

function actionConnectOff(nicksDiv){
  socket.disconnect()
  nicksDiv.innerHTML = ''
  /*gameDiv.style.display = 'none';*/
  return{
    type: "CONNECT_OFF"
  }
}

let turn = "b"
function actionChangeBoard(board, y, x, myturn=true){
 
  if(myturn && board){
    
    console.log('my turn send')
    //let turn = board[y][x][0] === "w" ? "b" : "w"
    socket.emit("turn", board)
  }
  else if (!myturn && board){
    console.log('enemy turn', board)    
    //turn  = board.turn === 'b' ? "w" : "b"
    //board = board.board
  }
  else {
    console.log('first turn my')
    turn = "w"    
  }
  return {
    type: "CHANGE_BOARD",
    board,
    turn
  }
}

function actionNewGame(newGame){
  socket.emit('newGame', {newGame: newGame.checked})
  /*gameDiv.style.display = 'none';*/
  return{
    type: "NEW_GAME"
  }
}


const reducers = combineReducers({
  b: boardReducer,
  m: menuReducer,
  gamers: gamersReducer
})

const store = createStore(reducers)


function isCellAvailable(board, figureX, figureY, x, y){
    if(figureX === null){
      return
    }
    //фигура, которой ходим
    const figure  = board[figureY][figureX]
    if(figure === " "){
      return
    }
    //находится ли вражеская фигура в проверяемой позиции x,y
    const isEnemyInCell = board[y][x][0] !== figure[0] 
    if (board[y][x][0] === figure[0]) return false;
    const figures = {
        p(){           
           //белые пешки ходят вниз
           const deltaY = figure[0] === 'w' ? +1 : -1;
           //первый ход может быть на две клетки
           var firstMove = 0;
           if(figure[0] === "w" && figureY === 1){
             firstMove = 2
           }else{
            if(figure[0] === "b" && figureY === 6){
              firstMove = -2
            }
           }
           return (
               ((figureY + deltaY === y) || (figureY + firstMove === y && board[figureY+firstMove][figureX] === " " && x === figureX)) && //всегда след. строка доски
               (
                   (figureX === x && board[figureY+deltaY][figureX] === " ") || 
                   (isEnemyInCell && Math.abs(figureX - x) === 1 && board[y][x][0] !== " ") 
               )
           )
        },
        r(){
          var notBlocked1 = true
          if(x === figureX && y < figureY) {
            for(let i = 1; i<(figureY-y); i++){
              if(notBlocked1 === false){
                break
              }else if(isEnemyInCell === true && board[y][x][0] !== " "){
                for(let j = 1; j<(figureY-y); j++){
                  if(notBlocked1 === false){
                    break
                  }
                  notBlocked1 = (board[y+j][figureX] === " ")
                }
                if(notBlocked1 === true){
                  break
                }
              }
            notBlocked1 = (board[y+i][figureX] === " ")
            }
          }

          var notBlocked2 = true
          if(x > figureX && y === figureY) {
            for(let i = 1; i<(x - figureX); i++){
              if(notBlocked2 === false){
                break
              }else if(isEnemyInCell === true && board[y][x][0] !== " "){
                for(let j = 1; j<(x - figureX); j++){
                  if(notBlocked2 === false){
                    break
                  }
                  notBlocked2 = (board[figureY][x-j] === " ")
                }
                if(notBlocked2 === true){
                  break
                }
              }
            notBlocked2 = (board[figureY][x-i] === " ")
            }
          }

          var notBlocked3 = true
          if(y > figureY && x === figureX) {
            for(let i = 1; i<(y - figureY); i++){
              if(notBlocked3 === false){
                break
              }else if(isEnemyInCell === true && board[y][x][0] !== " "){
                for(let j = 1; j<(y - figureY); j++){
                  if(notBlocked3 === false){
                    break
                  }
                  notBlocked3 = (board[y-j][figureX] === " ")
                }
                if(notBlocked3 === true){
                  break
                }
              }
            notBlocked3 = (board[y-i][figureX] === " ")
            }
          }

          var notBlocked4 = true
          if(x < figureX && y === figureY) {
            for(let i = 1; i<(figureX - x); i++){
              if(notBlocked4 === false){
                break
              }else if(isEnemyInCell === true && board[y][x][0] !== " "){
                for(let j = 1; j<(figureX - x); j++){
                  if(notBlocked4 === false){
                    break
                  }
                  notBlocked4 = (board[figureY][x+j] === " ")
                }
                if(notBlocked4 === true){
                  break
                }
              }
            notBlocked4 = (board[figureY][x+i] === " ")
            }
          }

          return(
            (y === figureY && x !== figureX || y !== figureY && x === figureX) && notBlocked1 && notBlocked2 && notBlocked3 && notBlocked4
          )
        },
        b(){
          const delta = figureX - figureY;
          //для верхней левой ветки
          var notBlocked1 = true
          if(y < figureY && x < figureX) {
            for(let i = 1; i<(figureY-y); i++){
              if(notBlocked1 === false){
                break
              }else if(isEnemyInCell === true && board[y][x][0] !== " "){
                for(let j = 1; j<(figureY-y); j++){
                  if(notBlocked1 === false){
                    break
                  }
                  notBlocked1 = (board[y+j][y+j+delta] === " ")
                }
                if(notBlocked1 === true){
                  break
                }
              }
            notBlocked1 = (board[y+i][y+i+delta] === " ")
            }
          }
          //для верхней правой 
          var notBlocked2 =true
          if(y < figureY && x > figureX){
            for(let i = 1; i<(figureY - y); i++){
              if(notBlocked2 === false){
                break
              }else if(isEnemyInCell === true && board[y][x][0] !== " "){
                for(let j = 1; j<(figureY - y); j++){
                  if(notBlocked2 === false){
                    break
                  }
                  notBlocked2 = (board[y+j][x-j] === " ")
                }
                if(notBlocked2 === true){
                  break
                }
              }
              notBlocked2 = (board[y+i][x-i] === " ")
            }
          }
          //для нижней левой
          var notBlocked3 =true
          if(y > figureY && x < figureX){
            for(let i = 1; i<(y - figureY); i++){
              if(notBlocked3 === false){
                break
              }else if(isEnemyInCell === true && board[y][x][0] !== " "){
                for(let j = 1; j<(y - figureY); j++){
                  if(notBlocked3 === false){
                    break
                  }
                  notBlocked3 = (board[y-j][x+j] === " ")
                }
                if(notBlocked3 === true){
                  break
                }
              }
              notBlocked3 = (board[y-i][x+i] === " ")
            }
          }
          //для нижней правой ветки
          var notBlocked4 = true
          if(y > figureY && x > figureX){
            for(let i = 1; i<(y - figureY); i++){
              if(notBlocked4 === false){
                break
              }else if(isEnemyInCell === true && board[y][x][0] !== " "){
                for(let j = 1; j<(y - figureY); j++){
                  if(notBlocked4 === false){
                    break
                  }
                  notBlocked4 = (board[y - j][y - j + delta] === " ")
                }
                if(notBlocked4 === true){
                  break
                }
              }
            notBlocked4 = (board[y - i][y - i+delta] === " ")
            }
          }
          return(
            ((x-y) === (figureX - figureY) || (x+y) === (figureX + figureY)) && (notBlocked1 && notBlocked2 && notBlocked3 && notBlocked4)

          )
        },
        n(){
          return(
            ((y === figureY + 1 ) && (x === figureX + 2 )) ||
            ((y === figureY - 1 ) && (x === figureX - 2 )) || 
            ((y === figureY + 2 ) && (x === figureX + 1 )) ||
            ((y === figureY - 2 ) && (x === figureX - 1 )) ||
            ((y === figureY + 1 ) && (x === figureX - 2 )) ||
            ((y === figureY - 1 ) && (x === figureX + 2 )) || 
            ((y === figureY - 2 ) && (x === figureX + 1 )) ||
            ((y === figureY + 2 ) && (x === figureX - 1 )) 
          )
        },
        q(){
          return(figures.r() || figures.b())
        },
        k(){
          return(
            (y === figureY+1 && x === figureX+1) ||
            (y === figureY-1 && x === figureX-1) ||
            (y === figureY-1 && x === figureX+1) ||
            (y === figureY+1 && x === figureX-1) ||
            (y === figureY && x === figureX+1) ||
            (y === figureY && x === figureX-1) ||
            (y === figureY-1 && x === figureX) ||
            (y === figureY+1 && x === figureX)
          )
        }
    }
    return figures[figure[1]]()
}

let socket;
let ourId;
let enemyId;
let connectedGamers;

let startGame = id => socket.emit('startGame', {id})


class ConnectDiv extends React.Component{
  constructor(props) {
    super(props)
  }
  state = {nick: "Anon"}

  handleChange = () => {
    let onTrue = () => {this.props.actionConnectOn(this.state.nick, this.nicksDiv)}
    let onFalse = () => {this.props.actionConnectOff(this.nicksDiv)}
    this.connect.checked ? onTrue() : onFalse()
  }

  render() {
    return(
      <div>
        <h1>Chess</h1>
        <input placeholder='Nick' id='nick' onChange={e => this.setState({nick: e.target.value})} value={this.state.nick}/>
        <label id='connectLabel'>
          <div ref = {ref => this.nicksDiv = ref}/>
          <input type='checkbox' id='connect' onChange = {this.handleChange} ref = {ref => this.connect = ref}/>Connect
        </label>
        {this.props.gamers.map((o) => <Gamers nick = {o.nick} newGame={o.newGame} id={o.id} inGameWith={o.inGameWith}/>)}
      </div>
    )
  }
}

class Gamers extends React.Component {
  constructor(props){
    super(props)
  }
  handleClick = () =>{
    startGame(this.props.id)
  }
  render(){
    return(
      <div /*style = {{color: {props.inGameWith ? "#BBB" : ""}}}*/>
        {this.props.nick}
        <button onClick = {this.handleClick}>Start Game</button>
      </div>
    )
  }
}

class NewGameLable extends React.Component{
  constructor(props){
    super(props)
  }
  handleChange = () => {
    this.props.actionNewGame(this.newGame)
  }
  render(){
    return(
      <label>
        <input type='checkbox' id='newGame' ref = {ref => this.newGame = ref} onChange = {this.handleChange}/>New Game
      </label>
    )
  }
}

class GameDiv extends React.Component{
  handleClick = () =>{
    socket.emit('turn', {data: this.props.board})
  }
  render(){
    return(
      <fieldset style = {this.props.showBoard}>
        <Board onClick = {this.handleClick} />
      </fieldset>
    )
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return(
      <div>
        <ConnectDiv />
        <NewGameLable />
        <GameDiv />
      </div>
    )
  }
}

class Figure extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    //нельзя кликать не в свою очередь 
    let disabled = this.props.color === this.props.turn ? this.props.onClick : ""
    let color = {w: "white", b: "black"}
    let figure = {
      p: "chess-pawn",
      b: "chess-bishop",
      k: "chess-king",
      n: "chess-knight",
      q: "chess-queen",
      r: "chess-rook"
    }
    return (
      <FontAwesomeIcon className = "figure"
                       icon={figure[this.props.name]} 
                       color = {color[this.props.color]} 
                       onClick = {disabled} />
    )
  }
}


class Square extends React.Component {
  constructor(props) {
  super(props)
  }
  render() {
    return (
      <button className = "square" 
              style = {{border: this.props.available === true ? "3px solid yellow" : ""}} 
              onClick = {this.props.available === true ? this.props.onClick : ""}>
        {this.props.children}
      </button>
    )
  }
}


class Board extends React.Component {
  constructor(props){
    super(props)
    this.state = {currentX: null, currentY: null, turn: "w"}
  }

  moveFigure(board, currentX, currentY, x, y, turn){
    this.setState({currentX: x, currentY: y, turn: "w"})
      if(currentX === null){
        return
      }
      //чтобы при новом клике на саму фигуру и на дружискую, они не пропадали 
      if(board[currentY][currentX][0] === board[y][x][0]) {
       return
     }
     //чтобы при ходе на клетку со вражеской фигура, фигура не пропадала 
     if(board[currentY][currentX][0] !== (board[y][x][0])&&
      isCellAvailable(board, currentX, currentY, x, y) !== true){
      return
     }
     /*нельзя ходить не в свою очередь */
     if(turn !== board[currentY][currentX][0]){
      return 
     }
     /*нельзя бить короля*/
     if(isCellAvailable(board, currentX, currentY, x, y) === true && board[y][x][1] === "k"){
      return
     }
     /*перерисовка доски*/
      var newBoard = [...board]
      newBoard[y][x] = newBoard[currentY][currentX]
      newBoard[currentY][currentX] = " "
      this.props.actionChangeBoard(newBoard, y, x)
      this.setState({currentX: null, currentY: null, /*чья очередь ходить*/turn: newBoard[y][x][0] === "w" ? "b" : "w"})
  }

  renderSquare(color, name, x,y) {
    this.handleClick = () => {
      this.moveFigure(this.props.board, this.state.currentX, this.state.currentY, x, y, this.props.turn)
    }
    return(
      <Square available = {isCellAvailable(this.props.board, this.state.currentX, this.state.currentY, x, y)} onClick = {this.handleClick}>
        <Figure color = {color} name = {name} onClick = {this.handleClick} x={x} y={y} turn = {this.props.turn} />
      </Square>
    )
  }

  render(){
      let filledBoard = []
    for(let i = 0; i < 8; i++){
      let boardLine = []
      for(let j = 0; j < 8; j++){
        var str = this.props.board[i][j]
        boardLine.push(this.renderSquare(str[0], str[1], j, i))
      }
      filledBoard.push(<div className = "line">{boardLine}</div>)
    }  
    return(
      <>
        {filledBoard}
      </>
    )
  }
}

let mapStateToProps = state => ({board: state.b.board, turn: state.b.turn, showBoard: state.m.showBoard, gamers: state.gamers.gamers})
let mapDispatchToProps = {actionChangeBoard, actionConnectOn, actionConnectOff, actionNewGame, actionGamers}

Board = connect(mapStateToProps, mapDispatchToProps)(Board)
ConnectDiv = connect(mapStateToProps, mapDispatchToProps)(ConnectDiv)
GameDiv = connect(mapStateToProps, mapDispatchToProps)(GameDiv)
NewGameLable = connect(mapStateToProps, mapDispatchToProps)(NewGameLable)
Gamers = connect(mapStateToProps, mapDispatchToProps)(Gamers)
Figure = connect(mapStateToProps, mapDispatchToProps)(Figure)


let App = (props) => {
  return(
  <Provider store = {store}>
    <div className = "game">
      <Game />
    </div>
  </Provider>
  )
}

export default App;
