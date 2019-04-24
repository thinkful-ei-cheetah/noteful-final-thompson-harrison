import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Note.css'
import NoteContext from '../NoteContext';

export default function Note(props) {
  return (
    <div className='Note'>
      <h2 className='Note__title'>
        <Link to={`/note/${props.id}`}>
          {props.name}
        </Link>
      </h2>


    <NoteContext.Consumer >
      {(context)=> ( 
      <button className='Note__delete' type='button' onClick={() => context.deleteNote(props.id)} >
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
            {format(props.modified, 'Do MMM YYYY')}
          </span>
        </div>
      </div>
    </div>
  )
}
