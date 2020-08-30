import React from 'react'
import { useSelector } from 'react-redux'
import { Box } from '@material-ui/core'

const SecondaryBar = ({ children }) => {
  const { theme } = useSelector(state => state.theme)

  const containerStyle = {
    borderBottom: `1px solid ${theme.palette.border.main}`,
    position: 'sticky',
    top: 0,
    backgroundColor: theme.palette.background.light,
    zIndex: 99
  }

  return (
    <Box style={containerStyle}>
      { children }
    </Box>
  )
}

export default SecondaryBar
