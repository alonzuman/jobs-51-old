import React from 'react'
import { Button, Grid } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { openSigningIn } from '../actions'

const LandingPage = () => {
  const { translation } = useSelector(state => state.theme)
  const { authenticated } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '70vh'
  }

  const gridStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }

  return (
    <div style={containerStyle}>
      <h1>hi</h1>
      {!authenticated &&
      <Grid style={gridStyle} container spacing={1}>
        <Grid item>
          <Button variant='outlined' onClick={() => dispatch(openSigningIn())}>{translation.lookingForAJob}</Button>
        </Grid>
        <Grid item>
          <Button color='primary' variant='outlined' onClick={() => dispatch(openSigningIn())}>{translation.postingAJob}</Button>
        </Grid>
      </Grid>}

      {authenticated &&
      <Grid style={gridStyle} container spacing={1}>
        <Grid item>
          <Link to='/results/jobs'>
            <Button variant='outlined'>{translation.lookingForAJob}</Button>
          </Link>
        </Grid>
        <Grid item>
          <Link to='/results/users'>
            <Button color='primary' variant='outlined'>{translation.postingAJob}</Button>
          </Link>
        </Grid>
      </Grid>}
    </div>
  )
}

export default LandingPage
