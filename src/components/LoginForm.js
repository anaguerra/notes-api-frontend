import React from 'react'
import Togglable from './Togglable'

// const LoginForm = ({handleLogin, handleUsernameChange, handlePasswordChange}) => {
const LoginForm = (props) => {
  return (
    <Togglable buttonLabel='Show loginn'>
      <form onSubmit={props.handleLogin}>
        <div>
        <input 
          type='text'
          value={props.username}
          name='Username'
          placeholder='Username'
          onChange={props.handleUsernameChange}
        />
        </div>
                
        <input 
          type='password'
          value={props.password}
          name='Password'
          placeholder='Password'
          onChange={props.handlePasswordChange}
        />
        <button>Login</button>
      </form>
    </Togglable>
  )
}

export default LoginForm