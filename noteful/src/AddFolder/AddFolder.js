import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import './AddFolder.css'
import API from '../App/API';
import NoteContext from '../NoteContext';

export default class AddFolder extends Component {
  render() {
    return (
      <section className='AddFolder'>
        <h2>Create a folder</h2>
        <NotefulForm>
          
          <div className='field' onSubmit={(event)=>{
            event.preventDefault();
            const nameInput = event.target.value;
            API.apiAddFolder(nameInput).then(res=>{
              if (res.ok){return res.json()}
            }).then(data=>{
              const folderId = data.id;
              this.props.addFolder(nameInput,folderId);
            
            });
          }}>
            <label htmlFor='folder-name-input'>
              Name
            </label>
            <input type='text' id='folder-name-input' required/>
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
