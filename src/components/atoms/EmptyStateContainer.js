import { Box, Typography } from '@material-ui/core'
import React from 'react'

const EmptyStateContainer = ({ art, title, subtitle, action }) => {
  return (
    <Box margin='0 auto' textAlign='center' padding={3} display='flex' flexDirection='column' alignItems='center' justifyContent='center' maxWidth={512}>
      <Box margin={4} width='100%' height='100%' >
        {art}
      </Box>
      <Typography className='mb-5' variant='h3'>{title}</Typography>
      <Typography className='mb-5' variant='body1'>{subtitle}</Typography>
      {action}
    </Box>
  )
}

export default EmptyStateContainer
