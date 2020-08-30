import React from 'react'
import { useSelector } from 'react-redux'
import { Typography, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import PageContainer from './components/layout/PageContainer'

const NoPermissionPage = () => {
  const { translation } = useSelector(state => state.theme)

  return (
    <PageContainer className='flex justify__center align__center flex__column'>
      <Typography className='text__center' variant='h1'>
        {translation.noPermissionsToThisPage}
      </Typography>
      <Link to='/jobs'>
        <Button variant='outlined'>{translation.backToHome}</Button>
      </Link>
    </PageContainer>
  )
}

export default NoPermissionPage
