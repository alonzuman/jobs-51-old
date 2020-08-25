import React from 'react'
import { AppBar } from '@material-ui/core'
import ShaldagLogoSmall from '../../ShaldagLogoSmall'
import { useSelector } from 'react-redux'

const TopBar = ({ children }) => {
  const { theme } = useSelector(state => state.theme)

  const containerStyle = {
    direction: 'rtl',
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
      <div style={childrenContainerStyle}>
        { children }
      </div>
    </AppBar>
  )
}

export default TopBar
