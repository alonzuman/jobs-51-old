import React from 'react'
import { Paper, Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'

const Activity = () => {
  const { translation, theme } = useSelector(state => state.theme)

  const paperStyle = {
    padding: '0 1rem',
    borderBottom: `1px solid ${theme.palette.border.main}`
  }

  return (
    <div style={{ direction: 'rtl' }}>
      <Paper style={paperStyle} elevation={0} square>
        <Typography variant='h1'>{translation.activity}</Typography>
      </Paper>
    </div>
  )
}

export default Activity
