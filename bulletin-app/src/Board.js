import React, { Component } from 'react';
import Note from './Note';

class Board extends Component {
  constructor(props) {
    // initialise state.
    super(props);
    this.state = {
      notes: [
        {
          id: 0,
          note: "Call Inma."
        },
        {
          id: 1,
          note: "Have a date with Inma."
        },
        {
          id: 2,
          note: "Buy Inma a flower."
        }
      ]
    }
    this.eachNote = this.eachNote.bind(this); // set eachNote() in scope.
    this.update = this.update.bind(this); // set update() in scope.
    this.remove =  this.remove.bind(this); // set remove() in scope.
  }
  update(newText, i){
    console.log("updating note at index", i, newText);
    this.setState(prevState => ({
      notes: prevState.notes.map(
        // for each item in the notes array, pass in the note.
        // if not updating the note, return as it is,
        // otherwise, return a new object note and overwrite the text for the note key.
        note => (note.id !== i) ? note : {...note, note: newText} // ternary.
      )
    }));
  }
  remove(id){
    console.log("removing note at index", id);
    this.setState(prevState => ({
      // pass prevState, reset the state of notes using filter.
      // filter() passing in a note to perform logical check.
      // return a new array that will remove the item where this is true.
      notes: prevState.notes.filter(note => note.id !== id)
    }));
  }
  eachNote(note, i){
    // render all notes based on dynamic data - each individual note.
    // jsx attributes: key and index.
    return (
      <Note key={i} index={i} onChange={this.update} onRemove={this.remove}>
        {note.note}
      </Note>
    )
  }
  render() {
    // render parent component of Board with child of Note.
    // Note on a Board.
    // jsx expression: {this.state.notes.map(callback)}
    // .map() to map over all of the notes that are in state, and call eachNote() for every instance of a note.
    return (
      <div className="board">
        {this.state.notes.map(this.eachNote)}
      </div>
    );
  }
}

export default Board;
