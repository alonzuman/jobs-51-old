import React, { useState } from 'react'
import { Button, Typography, Box } from '@material-ui/core'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import AuthDialog from '../../v2/layout/AuthDialog'
import ShaldagLogo from '../../assets/ShaldagLogo'
import Container from '../../v2/atoms/Container'

const LandingPage = () => {
  const { translation } = useSelector(state => state.theme)
  const { isFetching, uid, isAuthenticated } = useSelector(state => state.auth)
  const [isOpen, setIsOpen] = useState(false)

  const handleDialog = () => setIsOpen(!isOpen)

  if (isAuthenticated) {
    return <Redirect to={`/${uid}/activity`} />
  } else {
    return (
      <Container className='rtl mt-3 flex flex__column align__center justify__center'>
        <AuthDialog open={isOpen} onClose={handleDialog} />
        <ShaldagLogo />
        <Box className='mt-2 mb-1 p-1'>
          <Typography className='text__center mb-1' variant='body1'>{translation.landingPageText1}</Typography>
          <Typography className='text__center mb-1' variant='body1'>{translation.landingPageText2}</Typography>
          <Typography className='text__center mb-1' variant='body1'>{translation.platformForMembersOnly}</Typography>
        </Box>
        <Button
          size='large'
          disabled={isFetching}
          className='w-264'
          color='primary'
          variant='contained'
          onClick={handleDialog}
        >
          {translation.enter}
        </Button>
      </Container>
    )
  }
}

export default LandingPage;
