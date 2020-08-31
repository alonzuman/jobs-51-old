import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openDialog, addJob, getJobs, openAddingJob } from '../actions'
import Jobs from './Jobs'
import { Button, Typography } from '@material-ui/core'
import PageContainer from '../components/layout/PageContainer'
import { Link } from 'react-router-dom'

const Home = () => {
  const dispatch = useDispatch()
  const { translation } = useSelector(state => state.theme)

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    minHeight: '70vh'
  }

  return (
    <PageContainer style={containerStyle}>
      <Typography variant='h1'>{translation.homeText1}</Typography>
      <Typography style={{ maxWidth: 768 }} variant='body1'>{translation.landingPageText1}</Typography>
      <div className='flex full__width align__center justify__center'>
        <Link className='mb-5 mt-1 mr-1 ml-5' to='/jobs'>
          <Button className='button-style' variant='outlined' color='primary'>
            {translation.lookingForAJob}
          </Button>
        </Link>
        <Link className='mb-5 mt-1 mr-5 ml-5' to='/events'>
          <Button className='button-style' variant='outlined' color='primary'>
            {translation.lookingForAnActivity}
          </Button>
        </Link>
      </div>
    </PageContainer>
  )
}

export default Home
