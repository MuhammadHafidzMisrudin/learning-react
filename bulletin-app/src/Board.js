import React, { Component } from 'react';
import Note from './Note';

class Board extends Component {
  constructor(props) {
    // initialise state.
    super(props);
    this.state = {
      notes: [
        {
          id: 33,
          note: "Call Inma"
        },
        {
          id: 34,
          note: "Have a date with Inma"
        }
      ]
    }
    this.eachNote = this.eachNote.bind(this); // set eachNote method in scope.
  }
  eachNote(note, i){
    // render notes based on dynamic data - each individual note.
    // jsx attributes: key and index.
    return (
      <Note key={i} index={i}>
        {note.note}
      </Note>
    )
  }
  render() {
    // render parent component of Board with child of Note.
    // Note on a Board.
    // jsx expression: {this.state.notes.map(callback)}
    return (
      <div className="board">
        {this.state.notes.map(this.eachNote)}
      </div>
    );
  }
}

export default Board;
