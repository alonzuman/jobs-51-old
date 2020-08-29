import React from 'react'
import { AppBar, Typography, Paper } from '@material-ui/core'
import { useSelector } from 'react-redux'
import BackButton from './BackButton'
import './TopBar.css'

const TopBar = ({ title = '', children, backButton = false }) => {
  const { theme } = useSelector(state => state.theme)

  const borderStyle = {
    backgroundColor: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.border.main}`
  }

  const childrenContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    width: '100%'
  }

  return (
    <AppBar elevation={0} style={borderStyle} className='topbar__container'>
      <Paper elevation={0} className='paper__background'>
        <div className='top__row__container flex align__center full__width'>
          {backButton && <BackButton />}
          <Typography variant='h1'>{title}</Typography>
        </div>
        <div className='flex align__center full__width' style={childrenContainerStyle}>
          { children }
        </div>
      </Paper>
    </AppBar>
  )
}

export default TopBar
