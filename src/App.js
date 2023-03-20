import './App.css';
import { Note } from './Note';
import { useEffect, useState } from 'react';
import {create as createNote, getAll as getAllNotes} from './services/notes'; 

const App = (props) => {
  
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // hook para después del renderizado
  useEffect(() =>  {
    setLoading(true);
    
    getAllNotes().then((notes) => {
        console.log(notes);
        setNotes(notes);
        setLoading(false);
      })
    }, []);
  
  const handleChange = (event) => {
    setNewNote(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const noteAddToState = {
      userId: 1,
      title: newNote,
      content: newNote,
    }

  setError('');

  createNote(noteAddToState)
    .then(newNote => {
      setNotes((prevNotes) => prevNotes.concat(newNote));
    }).catch(error => {
      setError(error);
    });
    setNewNote('');
  }


  return (
    <div>
      <h1>Notes</h1>
      
      {loading ? 'Cargando...' : ''}
      
      <ul>
        {notes
          .map((note) => (
            <Note key={note.id} {...note} />
          ))
        }
      </ul>
      <form onSubmit={handleSubmit}>
        <input type='text' onChange={handleChange} value={newNote} />
        <button>Crear nota</button>
      </form>

      {error ? <span style={{color:'red'}}>{error}</span> : ''}
      <br /><br />
    </div>
  );
}

export default App;
