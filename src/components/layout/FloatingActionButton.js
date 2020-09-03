import React from 'react'
import './FloatingActionButton.css'
import { Fab } from '@material-ui/core'

const FloatingActionButton = ({ action, children, variant, color, title }) => {
  // TODO ALON FIX THE ACTION ON THE TEXT TF IS DIS
  return (
    <Fab variant={variant} color={color} onClick={action}>
      { children }
      <span style={{ margin: '0 .5rem' }}>{title}</span>
    </Fab>
  )
}

export default FloatingActionButton
