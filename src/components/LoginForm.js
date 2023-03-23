import React, { useState } from 'react'

// const LoginForm = ({handleLogin, handleUsernameChange, handlePasswordChange}) => {
const LoginForm = (props) => {
  const [loginVisible, setLoginVisible] = useState(false)

  const hideWhenVisible = { display: loginVisible ? 'none' : ''}
  const showWhenVisible = { display: loginVisible ? '' : 'none'}

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={() => setLoginVisible(true)}>Show login</button>
      </div>

      <div style={showWhenVisible}>
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
        <button onClick={() => setLoginVisible(false)}>Cancel</button>
      </div>
    </div>
  )
}

export default LoginForm