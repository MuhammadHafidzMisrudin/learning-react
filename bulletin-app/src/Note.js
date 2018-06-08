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
    this.randomBetween =  this.randomBetween.bind(this); // set randomBetween method in scope.
  }

  componentWillMount(){
    // set the style of notes.
    this.style = {
      right: this.randomBetween(0, window.innerWidth - 150, 'px'),
      top: this.randomBetween(0, window.innerHeight - 150, 'px'),
      transform: `rotate(${this.randomBetween(-25, 25, 'deg')})`
    }
  }

  randomBetween(x, y, s){
    // place the notes randomly on the screen.
    return x + Math.ceil(Math.random() * (y-x)) + s;
  }

  componentDidUpdate(){
    // place to highlight text in a selected note.
    var textArea;
    if (this.state.editing) {
      textArea = this._newText;
      textArea.focus();
      textArea.select();
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    // check to be sure that something (text) has been changed.
    // if something has been changed, it will re render.
    // if not, no re-render will happen.
    return (this.props.children !== nextProps.children || this.state !== nextState);
  }

  edit(){
    //alert("editing note"); debug.
    this.setState({
      editing: true  // set the edit button state.
    });
  }

  remove(){
    //alert("removing note");
    this.props.onRemove(this.props.index); // refers to remove(id).
  }

  save(e){
    //alert(this._newText.value);
    e.preventDefault(); // prevent the default behaviour of the form.
    this.props.onChange(this._newText.value, this.props.index); // refers to update(newText, i).
    this.setState({
      editing: false
    });
  }

  renderForm() {
    // create a form for a note to display.
    return (
      <div className="note" style={this.style}>
        <form onSubmit={this.save}>
          <textarea ref={input => this._newText = input}
                    defaultValue={this.props.children}/>
          <button id="save"><FaFloppyO/></button>
        </form>
      </div>
    )
  }

  renderDisplay() {
    // create and render a note to display.
    return (
      <div className="note" style={this.style}>
        <p>{this.props.children}</p>
        <span>
          <button id="edit" onClick={this.edit}><FaPencil/></button>
          <button id="remove" onClick={this.remove}><FaTrash/></button>
        </span>
      </div>
    );
  }

  render(){
    // rendering output.
    // if edit clicked, render a form.
    // otherwise, display a note.
    return this.state.editing ? this.renderForm() : this.renderDisplay();
  }
}

export default Note;

