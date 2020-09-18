import React from 'react'
import './FloatingActionButton.css'
import { Fab } from '@material-ui/core'

const FloatingActionButton = ({ action, children, color, title }) => {
  return (
    <Fab variant='extended' color={color} onClick={action}>
      <span className='ms-5'>{title}</span>
      { children }
    </Fab>
  )
}

export default FloatingActionButton
