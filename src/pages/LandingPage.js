import React from 'react'
import { Button, Grid, Typography, Box } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { openSigningIn, openAddingJob } from '../actions'
import { ReactComponent as Logo } from '../shaldagLogo.svg'

const LandingPage = () => {
  const { translation, direction } = useSelector(state => state.theme)
  const { authenticated } = useSelector(state => state.auth)
  const dispatch = useDispatch()

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

  const logoStyle = {
    width: '100%'
  }

  return (
    <div style={containerStyle}>
      <Logo style={logoStyle} />
      <Box style={textBoxStyle} className='text-box'>
        <Typography style={{ direction }} variant='body1'>{translation.landingPageText1}</Typography>
        <Typography style={{ direction }} variant='body1'>{translation.landingPageText2}</Typography>
        <Typography style={{ direction }} variant='body1'>{translation.platformForMembersOnly}</Typography>
      </Box>
      {!authenticated &&
      <Grid style={gridStyle} container spacing={1}>
        <Grid item>
          <Button color='default' variant='outlined' onClick={() => dispatch(openSigningIn())}>{translation.postingAJob}</Button>
        </Grid>
        <Grid item>
          <Button color='primary' variant='outlined' onClick={() => dispatch(openSigningIn())}>{translation.lookingForAJob}</Button>
        </Grid>
      </Grid>}

      {authenticated &&
      <Grid style={gridStyle} container spacing={1}>
        <Grid item>
          <Button onClick={() => dispatch(openAddingJob())} color='default' variant='outlined'>{translation.postingAJob}</Button>
        </Grid>
        <Grid item>
          <Link to='/results/jobs'>
            <Button color='primary' variant='outlined'>{translation.lookingForAJob}</Button>
          </Link>
        </Grid>
      </Grid>}
    </div>
  )
}

export default LandingPage
