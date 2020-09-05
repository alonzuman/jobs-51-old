import React from 'react'
import './FloatingActionButton.css'
import { Fab } from '@material-ui/core'

const FloatingActionButton = ({ action, children, color, title }) => {
  // TODO ALON FIX THE ACTION ON THE TEXT TF IS DIS
  return (
    <Fab variant='extended' color={color} onClick={action}>
      <span style={{ margin: '0 .5rem' }}>{title}</span>
      { children }
    </Fab>
  )
}

export default FloatingActionButton
