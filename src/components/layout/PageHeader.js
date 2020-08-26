import React from 'react'
import { Paper, Typography, Box } from '@material-ui/core'
import { useSelector } from 'react-redux'
import BackButton from './BackButton'

const PageHeader = ({ title, backButton = false, children }) => {
  const { theme } = useSelector(state => state.theme)

  const paperStyle = {
    padding: '0 1rem',
    borderBottom: `1px solid ${theme.palette.border.main}`
  }

  const boxStyle = {
    display: 'flex',
    alignItems: 'center'
  }

  return (
    <Paper style={paperStyle} elevation={0} square>
      <Box style={boxStyle}>
        {backButton && <BackButton />}
        <Typography variant='h1'>{title}</Typography>
      </Box>
      {children}
    </Paper>
  )
}

export default PageHeader
