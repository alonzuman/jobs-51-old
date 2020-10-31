import React, { useEffect, useState } from 'react'
import { Button, Typography, Box, Paper } from '@material-ui/core'
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../../actions'
import { app } from '../../firebase'
import AuthDialog from '../../v2/layout/AuthDialog'
import CircularSpinnerWithContainer from '../../v2/atoms/CircularSpinnerWithContainer'
import ShaldagLogo from '../../assets/ShaldagLogo'
import Container from '../../v2/atoms/Container'

const LandingPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const { translation } = useSelector(state => state.theme)
  const { loading } = useSelector(state => state.auth)
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch()
  const currentUser = app.auth().currentUser

  useEffect(() => {
    app.auth().onAuthStateChanged(async user => {
      if (user) {
        await dispatch(setUser(user))
        return setIsLoading(false)
      } else {
        return setIsLoading(false)
      }
    })
  }, [currentUser])

  const handleDialog = () => setIsOpen(!isOpen)

  if (isLoading) {
    return <CircularSpinnerWithContainer />
  } else if (currentUser && !loading) {
    return <Redirect to='/home' />
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
          disabled={loading}
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
