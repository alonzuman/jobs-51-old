import React from 'react'
import { Typography, Box } from '@material-ui/core'
import { useSelector } from 'react-redux'

const Notifications = () => {
  const { translation, theme } = useSelector(state => state.theme)

  const boxStyle = {
    padding: '1rem'
  }

  return (
    <>
      <Box style={boxStyle}>
        <Typography variant='body1'>{translation.notificationsEmptyState}</Typography>
      </Box>
    </>
  )
}

export default Notifications
