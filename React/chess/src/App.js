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
      <button className = "square">
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

  

  renderSquare(color, name, x,y) {

    this.handleClick = () => {
    this.setState({currentX: {x}, currentY: {y}})
    
    }

    return(
      <Square>
        <Figure color = {color} name = {name} onClick = {this.handleClick} x={x} y={y}/>
      </Square>
    )
  }

  render(){
      let filledBoard = []
    for(let i = 0; i < 8; i++){
      let boardLine = []
      for(let j = 0; j < 8; j++){
        var str = this.state.board[i][j]
        boardLine.push(this.renderSquare(str.charAt(0), str.charAt(1), j, i))
      }
      filledBoard.push(<div className = "line">{boardLine}</div>)
    }    console.log(this.state)
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
