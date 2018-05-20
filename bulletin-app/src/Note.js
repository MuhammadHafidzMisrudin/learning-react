import React, { Component } from 'react';
import FaPencil from 'react-icons/lib/fa/pencil';
import FaTrash from 'react-icons/lib/fa/trash';
import FaFloppyO from 'react-icons/lib/fa/floppy-o'

// create a Note component.
class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false  // add edit button state.
    }
    this.edit = this.edit.bind(this); // set edit method in scope.
    this.remove = this.remove.bind(this); // set remove method in scope.
    this.save = this.save.bind(this); // set save method in scope.
    this.renderForm = this.renderForm.bind(this); // set renderForm method in scope.
    this.renderDisplay = this.renderDisplay.bind(this); // set renderDisplay method in scope.
  }
  edit(){
    //alert("editing note"); debug.
    this.setState({
      editing: true  // set the edit button state.
    })
  }
  remove(){
    alert("removing note");
  }
  save(){
    alert("editing saved!");
  }
  renderForm() {
    // create a form for a note to display.
    return (
      <div className="note">
        <form>
          <textarea/>
          <button onClick={this.save}><FaFloppyO/></button>
        </form>
      </div>
    )
  }
  renderDisplay() {
    // create and render a note to display.
    return (
      <div className="note">
        <p>Learn React</p>
        <span>
          <button id="edit" onClick={this.edit}><FaPencil/></button>
          <button id="remove" onClick={this.remove}><FaTrash/></button>
        </span>
      </div>
    );
  }
  render(){
    if (this.state.editing) {
      return this.renderForm(); // if edit clicked, render a form.
    } else {
      return this.renderDisplay(); // otherwise, display a note.
    }
  }
}

export default Note;

