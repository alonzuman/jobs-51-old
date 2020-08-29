import React from 'react'
import { useSelector } from 'react-redux'
import { Typography, Container, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

const NoPermissionPage = () => {
  const { translation } = useSelector(state => state.theme)

  return (
    <Container className='flex justify__center align__center flex__column'>
      <Typography className='text__center' variant='h1'>
        {translation.noPermissionsToThisPage}
      </Typography>
      <Link to='/jobs'>
        <Button variant='outlined'>{translation.backToHome}</Button>
      </Link>
    </Container>
  )
}

export default NoPermissionPage
