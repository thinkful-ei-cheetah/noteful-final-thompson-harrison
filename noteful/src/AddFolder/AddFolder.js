import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import './AddFolder.css'
import API from '../App/API';
import cuid from 'cuid';
import NoteContext from '../NoteContext';


export default class AddFolder extends Component {
  static contextType = NoteContext;
  constructor(props){
    super(props);
    this.nameInput = React.createRef();
  }
  onSubmit =(event)=>{
    event.preventDefault();
    const nameInput = this.nameInput.current.value;
    const folderId = cuid();
    API.apiAddFolder(nameInput,folderId);
    this.context.addFolder(nameInput)
    this.props.history.push('/')
  }
  render() {
    return (
      <section className='AddFolder' >
        <h2>Create a folder</h2>
        <NotefulForm onSubmit={this.onSubmit}>
          
          <div className='field'>
            <label htmlFor='folder-name-input'>
              Name
            </label>
            <input type='text' id='folder-name-input' ref={this.nameInput}/>
          </div>
          <div className='buttons'>
          <button type='submit'>
          Add folder
          </button>
          </div>
        </NotefulForm>
      </section>
    )
  }
}
