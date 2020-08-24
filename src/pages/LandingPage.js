import React, { useState, useEffect } from 'react'
import { Button, Grid, Typography, Box, Container, Paper } from '@material-ui/core'
import { Link, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { openDialog, setUser } from '../actions'
import ShaldagLogo from '../ShaldagLogo'
import { app } from '../firebase'
import CircularSpinnerWithContainer from '../components/layout/CircularSpinnerWithContainer'

const LandingPage = () => {
  const { translation, direction } = useSelector(state => state.theme)
  const { authenticated } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const currentUser = app.auth().currentUser

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '70vh'
  }

  const textBoxStyle = {
    maxWidth: 700,
    margin: '2rem 1rem'
  }

  const gridStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: 'fit-content'
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
    alignItems: 'center'
  }

  useEffect(() => {
    app.auth().onAuthStateChanged(user => {
      if (user) return dispatch(setUser(user))
    })
  })

  if (currentUser) return <Redirect to='/results/jobs' />
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
          <Grid style={gridStyle} container spacing={1}>
            <Grid item>
              <Button color='default' variant='outlined' onClick={() => dispatch(openDialog({ type: 'AddJob', title: 'addJob' }))}>{translation.postingAJob}</Button>
            </Grid>
            <Grid item>
              <Button color='primary' variant='contained' onClick={() => dispatch(openDialog({ type: 'SignIn', title: 'signIn' }))}>{translation.lookingForAJob}</Button>
            </Grid>
          </Grid>
      </Paper>
    </Container>
  )
}

export default LandingPage
