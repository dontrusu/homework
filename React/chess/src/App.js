import React, { Component } from 'react';
import './App.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChessPawn, faChessBishop, faChessKing, faChessKnight, faChessQueen, faChessRook} from '@fortawesome/free-solid-svg-icons'

library.add(faChessPawn, faChessBishop, faChessKing, faChessKnight, faChessQueen, faChessRook)



class Square extends React.Component {
  render() {
    return (
      <button className = "square">
        {this.props.value}
      </button>
    )
  }
}

class Pawn extends React.Component {
  constructor(color){
    super(color)
    this.state = {color: {color}}
  }
  render() {
    return(
      <FontAwesomeIcon icon="chess-pawn" className = {this.state.color + "Pawn"} />
    )
  }
}

class Bishop extends React.Component {
  constructor(color){
    super(color)
    this.state = {color: color}
  }
  render() {
    return(
      <FontAwesomeIcon icon="chess-bishop" className = {this.state.color + "Bishop"} />
    )
  }
}

class King extends React.Component {
  constructor(color){
    super(color)
    this.state = {color: color}
  }
  render() {
    return(
      <FontAwesomeIcon icon="chess-king" className = {this.state.color + "King"} />
    )
  }
}

class Knight extends React.Component {
  constructor(color){
    super(color)
    this.state = {color: color}
  }
  render() {
    return(
      <FontAwesomeIcon icon="chess-knight" className = {this.state.color + "Knight"} />
    )
  }
}

class Queen extends React.Component {
  constructor(color){
    super(color)
    this.state = {color: color}
  }
  render() {
    return(
      <FontAwesomeIcon icon="chess-queen" className = {this.state.color + "Queen"} />
    )
  }
}

class Rook extends React.Component {
  constructor(color){
    super(color)
    this.state = {color: color}
  }
  render() {
    return(
      <FontAwesomeIcon icon="chess-rook" className = {this.state.color + "Rook"} />
    )
  }
}

class Board extends React.Component {
  constructor(){
    super()
  }
  renderSquare(i) {
    return <Square value = {i} />
  }
  render(){
    let board = []
    for(let i = 0; i < 8; i++){
      let boardLine = []
      for(let j = 0; j < 8; j++){
        boardLine.push(this.renderSquare(i*8+j))
      }
      board.push(<div className = "line">{boardLine}</div>)
    }
    return(
      <>
        {board}
      </>
    )
  }
}


let App = (props) => {
  return(
  <div className = "game">
    <Rook />
    <Knight />
    <Bishop />
    <King />
    <Queen />
    <Pawn />
    <Board />
  </div>
  )
}

export default App;
