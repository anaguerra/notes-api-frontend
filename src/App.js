import './App.css';
import { Note } from './Note';
import { useEffect, useState } from 'react';
import * as noteService from './services/notes'; 
import login from './services/login'; 
import LoginForm from './components/LoginForm';
import CreateNoteForm from './components/CreateNoteForm';

const App = (props) => {
  
  const [notes, setNotes] = useState([]);
  
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
  
  
  const createNewNoteAndAddToList = (noteObject) => {
    noteService.create(noteObject)
      .then(newNote => {
        setNotes((prevNotes) => prevNotes.concat(newNote));
      }).catch(error => {
        setError(error);
      });
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
          ? <CreateNoteForm 
            createNewNoteAndAddToList={createNewNoteAndAddToList}
          />
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
