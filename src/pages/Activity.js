import React from 'react'
import { Paper, Typography, Fab } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import AddIcon from '@material-ui/icons/Add'
import { openDialog } from '../actions/dialogs'

const Activity = () => {
  const dispatch = useDispatch()
  const { translation, theme } = useSelector(state => state.theme)

  const paperStyle = {
    padding: '0 1rem',
    borderBottom: `1px solid ${theme.palette.border.main}`
  }

  const fabStyle = {
    position: 'fixed',
    margin: '0 auto',
    bottom: '4.5rem',
    left: '50%',
    transform: 'translate(-50%, 0)'
  }

  return (
    <div style={{ direction: 'rtl' }}>
      <Fab variant='extended' color='primary' onClick={() => dispatch(openDialog({ type: 'AddJob', title: 'addJob' }))} style={fabStyle}>
        <AddIcon />
        <span style={{ margin: '0 .5rem' }}>{translation.addActivity}</span>
      </Fab>
      <Paper style={paperStyle} elevation={0} square>
        <Typography variant='h1'>{translation.activity}</Typography>
      </Paper>
    </div>
  )
}

export default Activity
