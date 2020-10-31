import React from 'react'
import { useSelector } from 'react-redux'
import { Typography, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import Container from '../../v2/atoms/Container'

const NoAccessPage = () => {
  const { translation } = useSelector(state => state.theme)

  return (
    <Container className='flex text__center justify__center align__center flex__column text__center'>
      <Typography className='text__center' variant='h1'>
        {translation.noPermissionsToThisPage}
      </Typography>
      <Link to='/jobs'>
        <Button variant='outlined'>{translation.backToHome}</Button>
      </Link>
    </Container>
  )
}

export default NoAccessPage
