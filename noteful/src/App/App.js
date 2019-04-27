import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NoteListNav from '../NoteListNav/NoteListNav'
import NotePageNav from '../NotePageNav/NotePageNav'
import NoteListMain from '../NoteListMain/NoteListMain'
import NotePageMain from '../NotePageMain/NotePageMain'
import AddFolder from '../AddFolder/AddFolder'
import AddNote from '../AddNote/AddNote'
import { getNotesForFolder, findNote, findFolder, countNotesForFolder } from '../notes-helpers'
import './App.css'
import API from './API';

import NoteContext from '../NoteContext';


class App extends Component {
  state = {
    notes: [],
    folders: [],
    error:null,
    params: ''
  
  };

  static contextType = NoteContext;
  


  formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
    return queryItems.join('&');
  }

  componentDidMount() {
      API.apiGet()
      .then(res => {
        if(!res.ok) {
          throw new Error('Something went wrong, please try again later.');
        }
        return res;
      })
      .then(res => res.json())
      .then(data => { 
        this.setState({
          notes:data.notes,
          folders: data.folders,
          error: null
        });
      })
      .catch(err => {
        this.setState({
          error: err.message
        });
      });
  }
  
  addFolder = (folderName,folderId)=>{
    let newList = this.state.folders;
    const newFolder = {
      name:folderName,
      id:folderId
    }
    newList.push(newFolder);
    this.setState({
      folders:newList,
    })
  }
  addNote = (name, content, folderId, id,time)=>{
    let newList = this.state.notes;
    const newNote = {
      name:name,
      content:content,
      modified:time,
      id:id,
      folderId:folderId
    }
    newList.push(newNote);
    this.setState({
      notes:newList
    })
  }
  noteDelete = (noteId) => {
      
          API.apiDelete(noteId);

          const newNotes = this.state.notes.filter(note => noteId !== note.id);
          this.setState({
            notes:newNotes,
          })
          
  
      }
  
  
  renderNavRoutes() {
    const { notes, folders } = this.state
    return (
      <>
        {['/', '/folder/:folderId'].map(path =>
          <Route
            exact
            key={path}
            path={path}
            render={routeProps =>
              <NoteListNav
                folders={folders}
                notes={notes}
                {...routeProps}
              />
            }
          />
        )}
        <Route
          path='/note/:noteId'
          render={routeProps => {
            const { noteId } = routeProps.match.params
            const note = findNote(notes, noteId) || {}
            const folder = findFolder(folders, note.folderId)
            return (
              <NotePageNav
                {...routeProps}
                folder={folder}
              />
            )
          }}
        />
        <Route
          path='/add-folder'
          component={NotePageNav}
        />
        <Route
          path='/add-note'
          component={NotePageNav}
        />
      </>
    )
  }

  renderMainRoutes() {
    const { notes, folders } = this.state;
    const contextValue={
      addNotes:this.addNote
    };
    return (
      <>
        {['/', '/folder/:folderId'].map(path =>
          <Route
            exact
            key={path}
            path={path}
            render={routeProps => {
              const { folderId } = routeProps.match.params
              const notesForFolder = getNotesForFolder(notes, folderId)
              return (
                <NoteListMain
                  {...routeProps}
                  notes={notesForFolder}
                />
              )
            }}
          />
        )}
        <Route
          path='/note/:noteId'
          render={routeProps => {
            const { noteId } = routeProps.match.params
            const note = findNote(notes, noteId)
            return (
              <NotePageMain
                {...routeProps}
                note={note}
              />
            )
          }}
        />
        <Route
          path='/add-folder'
          component={AddFolder}
        />
        <Route
          path='/add-note'
          render={routeProps => {
            return (
              <AddNote
                {...routeProps}
                folders={folders}
                note={contextValue}
              />
            )
          }}
        />
      </>
    )
  }

render() {

    const contextValue = {
      deleteNote : this.noteDelete,
      addFolder:this.addFolder,
      addNotes:this.addNote
    }
    return (
      <NoteContext.Provider 
        value={contextValue}>
        <div className='App'>
          <nav className='App__nav'>
            {this.renderNavRoutes()}
          </nav>
          <header className='App__header'>
            <h1>
              <Link to='/'>Noteful</Link>
              {' '}
              <FontAwesomeIcon icon='check-double' />
            </h1>
          </header>
          <main className='App__main'>
            {this.renderMainRoutes()}
          </main>
        </div>
      </NoteContext.Provider>
    )
  }
}

export default App
