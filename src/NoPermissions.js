import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Typography, Button } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { signOut } from './actions'

const NoPermissions = () => {
  const dispatch = useDispatch()
  const { authenticated, loading } = useSelector(state => state.auth)
  const { translation } = useSelector(state => state.theme)

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100%',
    minHeight: 500,
    direction: 'rtl'
  }

  if (!loading && !authenticated) {
    return <Redirect to='/' />
  } else {
    return (
      <div style={containerStyle}>
        <Typography variant='h1'>{translation.noPermission}</Typography>
        <Link to='/'>
          <Button onClick={() => dispatch(signOut())} variant='outlined'>{translation.backToHome}</Button>
        </Link>
      </div>
    )
  }
}

export default NoPermissions
