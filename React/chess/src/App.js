import React, { Component } from 'react';
import './App.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChessPawn, faChessBishop, faChessKing, faChessKnight, faChessQueen, faChessRook} from '@fortawesome/free-solid-svg-icons'

library.add(faChessPawn, faChessBishop, faChessKing, faChessKnight, faChessQueen, faChessRook)


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

var board = [
      ['wr','wn','wb','wq','wk','wb','wn','wr'],
      ['wp','wp','wp','wp','wp','wp','wp','wp'],
      [' ',' ',' ',' ',' ',' ',' ',' '],
      [' ',' ',' ',' ',' ',' ',' ',' '],
      [' ',' ',' ',' ',' ',' ',' ',' '],
      [' ',' ',' ',' ',' ',' ',' ',' '],
      ['bp','bp','bp','bp','bp','bp','bp','bp'],
      ['br','bn','bb','bq','bk','bb','bn','br'] ]

class Board extends React.Component {
  constructor(props){
    super(props)
    this.state = {board: board, currentX: null, currentY: null, turn: "w"}
  }

   isCellAvailable(board, figureX, figureY, x, y){
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

  moveFigure(board, x, y){
    this.setState({currentX: x, currentY: y})
      if(this.state.currentX === null){
        return
      }
      //чтобы при новом клике на саму фигуру и на дружискую, они не пропадали 
      if(board[this.state.currentY][this.state.currentX][0] === board[y][x][0]) {
       return
     }
     //чтобы при ходе на клетку со вражеской фигура, фигура не пропадала 
     if(board[this.state.currentY][this.state.currentX][0] !== (board[y][x][0])&&
      this.isCellAvailable(board, this.state.currentX, this.state.currentY, x, y) !== true){
      return
     }
     /*нельзя ходить не в свою очередь */
     if(this.state.turn !== board[this.state.currentY][this.state.currentX][0]){
      return 
     }
     /*нельзя бить короля*/
     if(this.isCellAvailable(board, this.state.currentX, this.state.currentY, x, y) === true && board[y][x][1] === "k"){
      return
     }
     /*перерисовка доски*/
      var newBoard = [...board]
      newBoard[y][x] = newBoard[this.state.currentY][this.state.currentX]
      newBoard[this.state.currentY][this.state.currentX] = " "
      this.setState({board: newBoard, currentX: null, currentY: null, /*чья очередь ходить*/turn: newBoard[y][x][0] === "w" ? "b" : "w"})
  }

  renderSquare(color, name, x,y) {
    this.handleClick = () => {
      this.moveFigure(this.state.board, x, y)
    }
    return(
      <Square available = {this.isCellAvailable(this.state.board, this.state.currentX, this.state.currentY, x, y)} onClick = {this.handleClick}>
        <Figure color = {color} name = {name} onClick = {this.handleClick} x={x} y={y} turn = {this.state.turn} />
      </Square>
    )
  }

  render(){
    console.log(this.state)
      let filledBoard = []
    for(let i = 0; i < 8; i++){
      let boardLine = []
      for(let j = 0; j < 8; j++){
        var str = this.state.board[i][j]
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


let App = (props) => {
  return(
  <div className = "game">
    <Board />
  </div>
  )
}

export default App;
