import React from 'react'
import { AppBar, Box } from '@material-ui/core'
import ShaldagLogo from '../../ShaldagLogo'
import { useSelector } from 'react-redux'

const TopBar = ({ children }) => {
  const { theme } = useSelector(state => state.theme)

  const containerStyle = {
    position: 'fixed',
    top: 0,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    height: 'fit-content',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.border.main}`
  }

  const childrenContainerStyle = {
    width: '100%',
  }

  return (
    <AppBar elevation={0} style={containerStyle}>
      <ShaldagLogo height={48} />
      <div style={childrenContainerStyle}>
        { children }
      </div>
    </AppBar>
  )
}

export default TopBar
