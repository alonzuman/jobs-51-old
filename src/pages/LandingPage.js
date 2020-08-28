import React, { useState, useEffect } from 'react'
import { Button, Grid, Typography, Box, Container, Paper } from '@material-ui/core'
import { Link, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { openDialog, setUser } from '../actions'
import ShaldagLogo from '../ShaldagLogo'
import { app } from '../firebase'

const LandingPage = () => {
  const { translation, direction } = useSelector(state => state.theme)
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
  })

  if (currentUser) return <Redirect to='/jobs' />
  return (
    <Container style={containerStyle}>
      <Paper style={paperStyle}>
        <ShaldagLogo />
        <Box style={textBoxStyle} className='text-box'>
          <Typography style={textStyle} variant='body1'>{translation.landingPageText1}</Typography>
          <br />
          <Typography style={textStyle} variant='body1'>{translation.landingPageText2}</Typography>
          <br />
          <Typography style={textStyle} variant='body1'>{translation.platformForMembersOnly}</Typography>
        </Box>
        <Button style={{ marginBottom: '.5rem', maxWidth: 300 }} className='button-style full-width' color='primary' variant='contained' onClick={() => dispatch(openDialog({ type: 'SignIn', title: 'signIn' }))}>{translation.enter}</Button>
    </Paper>
  </Container>
  )
}

export default LandingPage
