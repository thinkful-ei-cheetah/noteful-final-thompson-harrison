import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import './AddNote.css'
import cuid from 'cuid';
import API from '../App/API';
import NoteContext from '../NoteContext';

export default class AddNote extends Component {
  static contentType = NoteContext;
  constructor(props){
    super(props)
    this.nameInput = React.createRef();
    this.ContentInput = React.createRef();
    this.Folderinput = React.createRef();
  }

  onSubmit = (event)=>{
    event.preventDefault();
    const time = new Date().toISOString();
    const name = this.nameInput.current.value;
    const contentIn = this.ContentInput.current.value;
    const folderId = this.Folderinput.current.value;
    const id =cuid();
    this.props.note.addNotes(name,contentIn,folderId,id,time)
    API.apiAddNote(name,contentIn,folderId,id,time);
    this.props.history.push('/')
  }
  render() {
    const { folders} = this.props
    return (
      <section className='AddNote'>
        <h2>Create a note</h2>
        <NotefulForm onSubmit={this.onSubmit}>
          <div className='field'>
            <label htmlFor='note-name-input'>
              Name
            </label>
            <input type='text' id='note-name-input' ref={this.nameInput}/>
          </div>
          <div className='field'>
            <label htmlFor='note-content-input'>
              Content
            </label>
            <textarea id='note-content-input'  ref={this.ContentInput}/>
          </div>
          <div className='field'>
            <label htmlFor='note-folder-select'>
              Folder
            </label>
            <select id='note-folder-select'  ref={this.Folderinput}>
              <option value={null}>...</option>
              {folders.map(folder =>
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              )}
            </select>
          </div>
          <div className='buttons'>
            <button type='submit'>
              Add note
            </button>
          </div>
        </NotefulForm>
      </section>
    )
  }
}
