import React from 'react'
import { Fab } from '@material-ui/core'

// TODO change to styled componnet
const FloatingActionButton = ({ action, children, color, title }) => {
  return (
    <Fab variant='extended' color={color} onClick={action}>
      <span className='ms-5'>{title}</span>
      { children }
    </Fab>
  )
}

export default FloatingActionButton
