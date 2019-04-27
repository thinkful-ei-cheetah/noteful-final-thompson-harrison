import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Note.css'
import NoteContext from '../NoteContext';

export default class Note extends Component {

  render() {

  return (
    <div className='Note'>
      <h2 className='Note__title'>
        <Link to={`/note/${this.props.id}`}>
          {this.props.name}
        </Link>
      </h2>


    <NoteContext.Consumer >
      {(context)=> ( 
      <button className='Note__delete' type='button' 
      onClick={() => {
        context.deleteNote(this.props.id); 
        if(this.props.onDelete){this.props.onDelete();};
        }} >
          <FontAwesomeIcon icon='trash-alt' />
          {' '}
          remove
        </button>
        )}
    </NoteContext.Consumer>


      <div className='Note__dates'>
        <div className='Note__dates-modified'>
          Modified
          {' '}
          <span className='Date'>
            {format(this.props.modified, 'Do MMM YYYY')}
          </span>
        </div>
      </div>
    </div>
  )
      }
}
