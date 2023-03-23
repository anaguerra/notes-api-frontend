import './App.css';
import { Note } from './Note';
import { useEffect, useState } from 'react';
import * as noteService from './services/notes'; 
import login from './services/login'; 
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';

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

  useEffect(() =>  {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser') 

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, []); // array de dependencias vacío significa que sólo se va a ejecutar la primera vevz
  
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
      const user = await login({ 
        username,
        password
      })

      window.localStorage.setItem(
        'loggedNoteAppUser', JSON.stringify(user)
      )

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
  
  const handleLogout = () => {
    setUser(null)
    noteService.setToken(null)
    window.localStorage.removeItem('loggedNoteAppUser')
  }
  
    return (
    <div>
      <h1>Notes</h1>

      {error ? <span style={{color:'red'}}>{error}</span> : ''}
      
      {loading ? 'Cargando...' : ''}

      {
        user 
          ? renderCreateNoteForm()
          : <LoginForm 
              username={username} 
              password={password} 
              handleUsernameChange={
                (event) => setUsername(event.target.value)
              }
              handlePasswordChange={
                (event) => setPassword(event.target.value)
              }
              handleLogin={handleLogin}
            />
      }

      <div>
        <button onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>
      
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
