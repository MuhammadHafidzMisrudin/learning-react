import React, { Component } from 'react';
import Note from './Note';
import FaPlus from 'react-icons/lib/fa/plus'

class Board extends Component {
  constructor(props) {
    // initialise state.
    super(props);
    this.state = {
      notes: []
    }
    this.add = this.add.bind(this); // set add() in scope.
    this.eachNote = this.eachNote.bind(this); // set eachNote() in scope.
    this.update = this.update.bind(this); // set update() in scope.
    this.remove =  this.remove.bind(this); // set remove() in scope.
    this.nextId = this.nextId.bind(this); // set nextId() in scope.
  }
  componentWillMount(){
    // will be invoked before render.
    var self = this;
    if (this.props.count) {
       // load notes in state variable using fetch.
      fetch(`https://baconipsum.com/api/?type=all-meat&sentences=${this.props.count}`)
        .then(response => response.json())
        .then(json => json[0].split('. ').forEach(sentence => self.add(sentence.substring(0, 25))));
    }
  }
  add(text){
    // create and add new notes.
    // return an object.
    this.setState(prevState => ({
      notes: [
        // take all the notes that already in state,
        // push them into a new array,
        // then append on another note.
        // create a new note with id and text.
        ...prevState.notes,
        {
          id: this.nextId(),
          note: text
        }
      ]
    }));
  }
  nextId(){
    // create a new id for a new Note object.
    this.uniquesId = this.uniquesId || 0;
    return this.uniquesId++;
  }
  update(newText, i){
    // update note content.
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
        <button onClick={this.add.bind(null, "New Note")}
                id="add">
                <FaPlus/>
        </button>
      </div>
    );
  }
}

export default Board;
