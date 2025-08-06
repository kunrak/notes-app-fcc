import React from 'react'
import {fakeData as notes} from '../assets/fakeData.js'
import NoteCard from '../components/NoteCard.jsx'

function NotesPage() {
  return (
    <div>
      {notes.map((note) => {
        return (
          <div>
            <NoteCard key={note.$id} note={note} />
          </div>
        )
      })}
    {}</div>
  )
}

export default NotesPage