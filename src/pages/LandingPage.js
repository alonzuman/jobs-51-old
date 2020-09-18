import React, { useEffect } from 'react'
import { Button, Typography, Box, Paper } from '@material-ui/core'
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { openDialog, setUser } from '../actions'
import ShaldagLogo from '../ShaldagLogo'
import { app } from '../firebase'
import PageContainer from '../components/layout/PageContainer'
import CircularSpinnerWithContainer from '../components/layout/CircularSpinnerWithContainer'

const LandingPage = () => {
  const { translation, direction } = useSelector(state => state.theme)
  const { loading } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const currentUser = app.auth().currentUser

  const containerStyle = {
    direction: 'rtl',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '70vh',
  }

  const textBoxStyle = {
    maxWidth: 700,
    margin: '2rem 1rem'
  }

  const textStyle = {
    direction,
  }

  const paperStyle = {
    height: '100%',
    position: 'fixed',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1rem'
  }

  useEffect(() => {
    app.auth().onAuthStateChanged(user => {
      if (user) return dispatch(setUser(user))
    })
  }, [currentUser])

  if (loading) {
    return <CircularSpinnerWithContainer />
  } else if (currentUser && !loading) {
    return <Redirect to='/home' />
  } else {
    return (
      <PageContainer style={containerStyle}>
        <Paper style={paperStyle}>
          <ShaldagLogo />
          <Box style={textBoxStyle} className='text-box'>
            <Typography style={textStyle} variant='body1'>{translation.landingPageText1}</Typography>
            <br />
            <Typography style={textStyle} variant='body1'>{translation.landingPageText2}</Typography>
            <br />
            <Typography style={textStyle} variant='body1'>{translation.platformForMembersOnly}</Typography>
          </Box>
          <Button disabled={loading} style={{ marginBottom: '.5rem', maxWidth: 300 }} className='button-style full-width' color='primary' variant='contained' onClick={() => dispatch(openDialog({ type: 'SignIn', title: 'signIn' }))}>{translation.enter}</Button>
        </Paper>
      </PageContainer>
    )
  }
}

export default LandingPage
