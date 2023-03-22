import './App.css';
import { Note } from './Note';
import { useEffect, useState } from 'react';
import * as noteService from './services/notes'; 
import login from './services/login'; 

const App = (props) => {
  
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');

  // hook para después del renderizado
  useEffect(() =>  {
    setLoading(true);
    
    noteService.getAll().then((notes) => {
        console.log(notes);
        setNotes(notes);
        setLoading(false);
      })
    }, []);
  
  const handleChangeNote = (event) => {
    setNewNote(event.target.value);
  }

  const handleAddNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5
    }

    noteService.create(noteObject)
      .then(newNote => {
        setNotes((prevNotes) => prevNotes.concat(newNote));
      }).catch(error => {
        setError(error);
      });
      setNewNote('');
  }

  const handleLogin = async (event) => { // se podría hacer con promesas también
    event.preventDefault()

    // el problema de los await es que necesitan try/catch
    try {
      const user = await login({ username, password})
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setError('Login error')
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  }

  const renderLoginForm = () => {
    return(
      <form onSubmit={handleLogin}>
        <div>
        <input 
          type='text'
          value={username}
          name='Username'
          placeholder='Username'
          onChange={(event) => setUsername(event.target.value)}
        />
        </div>
                
        <input 
          type='password'
          value={password}
          name='Password'
          placeholder='Password'
          onChange={(event) => setPassword(event.target.value)}
        />
        <button>Login</button>
      </form>
    )
  }

  const renderCreateNoteForm = () => (
      <form onSubmit={handleAddNote}>
        <input
        placeholder='Escriba el texto de la nota'
          type='text' 
          onChange={handleChangeNote} 
          value={newNote} 
        />
        <button>Crear nota</button>
      </form>
  )
  
  
  
    return (
    <div>
      <h1>Notes</h1>
      {error ? <span style={{color:'red'}}>{error}</span> : ''}
      
      {loading ? 'Cargando...' : ''}

      {
        user 
          ? renderCreateNoteForm()
          : renderLoginForm()
      }

      <ul>
        {notes
          .map((note) => (
            <Note key={note.id} {...note} />
          ))
        }
      </ul>
      <br /><br />
    </div>
  );
}

export default App;
