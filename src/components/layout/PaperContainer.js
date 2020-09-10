import React from 'react'
import { Paper } from '@material-ui/core'

const PaperContainer = ({ style, children }) => {
  const containerStyle = {
    boxShadow: 'none',
    borderRadius: '1rem',
    padding: '1rem',
    ...style
  }

  return (
    <Paper style={containerStyle} >
      { children }
    </Paper>
  )
}

export default PaperContainer
