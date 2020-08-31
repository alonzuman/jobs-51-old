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
    zIndex: 9999
  }

  return (
    <Box style={containerStyle}>
      <div style={{ backgroundColor: theme.palette.background.light }} className='margin__center max__width'>
        { children }
      </div>
    </Box>
  )
}

export default SecondaryBar
