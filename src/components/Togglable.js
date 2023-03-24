import React, { useState, useImperativeHandle, forwardRef } from 'react'

// forwardRef tiene que envolver el componente de React
const Togglable = forwardRef(({children, buttonLabel}, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : ''}
  const showWhenVisible = { display: visible ? '' : 'none'}

  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    } 
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>

      <div style={showWhenVisible}>
        { children }
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
  </div>
  )
})


export default Togglable
