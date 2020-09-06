import React from 'react'
import './PaperContainer.css'
import { Paper } from '@material-ui/core'

const PaperContainer = ({ style, children }) => {
  return (
    <Paper style={{...style}} className='paper__container'>
      { children }
    </Paper>
  )
}

export default PaperContainer
