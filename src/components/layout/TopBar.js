import React from 'react'
import { AppBar, Typography, Paper } from '@material-ui/core'
import ShaldagLogoSmall from '../../ShaldagLogoSmall'
import { useSelector } from 'react-redux'
import BackButton from './BackButton'

const TopBar = ({ title = '', children, backButton = false }) => {
  const { theme } = useSelector(state => state.theme)

  const containerStyle = {
    position: 'sticky',
    top: 0,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.border.main}`
  }

  const topRowStyle = {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: '.5rem 1rem'
  }

  const childrenContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    width: '100%'
  }

  const paperStyle = {
    width: '100%',
    height: '100%',
    borderRadius: 0
  }

  return (
    <AppBar elevation={0} style={containerStyle}>
      <Paper elevation={0} style={paperStyle}>
        <div style={topRowStyle}>
          {backButton && <BackButton />}
          <Typography variant='h1'>{title}</Typography>
        </div>
        <div style={childrenContainerStyle}>
          { children }
        </div>
      </Paper>
    </AppBar>
  )
}

export default TopBar
