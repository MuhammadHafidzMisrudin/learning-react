import React, { Component } from 'react';
import FaPencil from 'react-icons/lib/fa/pencil';
import FaTrash from 'react-icons/lib/fa/trash';

// create a Note component.
class Note extends Component {
  edit(){
    alert("editing note");
  }
  remove(){
    alert("removing note");
  }
  render() {
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
}

export default Note;

