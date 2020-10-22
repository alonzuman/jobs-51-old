import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Typography, Button } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { signOut } from './actions'
import Container from './v2/atoms/Container'

const NoPermissions = () => {
  const dispatch = useDispatch()
  const { authenticated, loading } = useSelector(state => state.auth)
  const { translation } = useSelector(state => state.theme)

  if (!loading && !authenticated) {
    return <Redirect to='/' />
  } else {
    return (
      <Container className='flex justify__center flex__column align__center p-1 rtl'>
        <Typography style={{ marginTop: 196 }} variant='h2'>{translation.noPermission}</Typography>
        <Link to='/'>
          <Button onClick={() => dispatch(signOut())} variant='outlined'>{translation.backToHome}</Button>
        </Link>
      </Container>
    )
  }
}

export default NoPermissions
