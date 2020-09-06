import React from 'react'
import './PaperContainer.css'
import { Paper } from '@material-ui/core'

const PaperContainer = ({ children }) => {
  return (
    <Paper className='paper__container'>
      { children }
    </Paper>
  )
}

export default PaperContainer
