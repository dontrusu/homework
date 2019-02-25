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
      <FontAwesomeIcon className = "figure" icon={figure[this.props.name]} color = {color[this.props.color]} onClick = {this.props.onClick}/>
    )
  }
}

class Square extends React.Component {
  constructor(props) {
  super(props)
  }
  render() {
    return (
      <button className = "square" style = {{border: this.props.available === true ? "3px solid red" : ""}} 
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
    this.state = {board: board, currentX: null, currentY: null}

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
           return (
               (figureY + deltaY === y) && //всегда след. строка доски
               (
                   (figureX === x && board[figureY+deltaY][figureX] === " ") || 
                   (isEnemyInCell && Math.abs(figureX - x) === 1 && board[y][x][0] !== " ") 
               )
           )
        },
        r(){
          return(
            y === figureY && x !== figureX || y !== figureY && x === figureX  
          )
        },
        b(){
          return(
            (x-y) === (figureX - figureY) || (x+y) === (figureX + figureY) 
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

  renderSquare(color, name, x,y) {
    this.handleClick = () => {
      //чтобы сбрасывать выбраную фигуру
      this.setState({currentX: x, currentY: y})
      if(this.state.currentX === null){
        return
      }
      //чтобы при новом клике на саму фигуру и на дружискую, они не пропадали 
      if(this.state.board[this.state.currentY][this.state.currentX][0] === this.state.board[y][x][0]) {
       return
     }
     //чтобы при ходе на клетку со вражеской фигура, фигура не пропадала 
     if(this.state.board[this.state.currentY][this.state.currentX][0] !== (this.state.board[y][x][0])&&
      this.isCellAvailable(this.state.board, this.state.currentX, this.state.currentY, x, y) !== true){
      return
     }
      var newBoard = [...board]
      newBoard[y][x] = newBoard[this.state.currentY][this.state.currentX]
      newBoard[this.state.currentY][this.state.currentX] = " "
      this.setState({board: newBoard, currentX: null, currentY: null})
    }

    return(
      <Square available = {this.isCellAvailable(this.state.board, this.state.currentX, this.state.currentY, x, y)} 
             onClick = {this.handleClick}>
        <Figure color = {color} name = {name} onClick = {this.handleClick} x={x} y={y}/>
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
