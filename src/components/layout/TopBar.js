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
    padding: '.25rem 1rem',
    backgroundColor: theme.palette.background.default,
    borderBottom: `1px solid ${theme.palette.background.paper}`
  }

  const childrenContainerStyle = {
    width: '100%',
    padding: '.25rem 0'
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
