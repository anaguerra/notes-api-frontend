import { useState } from 'react'
import Togglable from './Togglable';

const CreateNoteForm = ({createNewNoteAndAddToList}) => {
  
  const [newNote, setNewNote] = useState('')
  
  const handleChange = (event) => {
    setNewNote(event.target.value);
  }

  const handleAdd = (event) => {
    event.preventDefault();
    
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5
    }

    createNewNoteAndAddToList(noteObject)
    setNewNote('')
  }

  return (
    <Togglable buttonLabel='New note'>
      <h3>Create a new note</h3>
      
      <form onSubmit={handleAdd}>
        <input
        placeholder='Escriba el texto de la nota'
          type='text' 
          onChange={handleChange} 
          value={newNote} 
        />
        <button>Crear nota</button>
      </form>
    </Togglable>
)}

export default CreateNoteForm