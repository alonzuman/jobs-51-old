import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openDialog, addJob, getJobs, openAddingJob } from '../actions'
import Jobs from './Jobs'
import { Button, Typography } from '@material-ui/core'
import PageContainer from '../components/layout/PageContainer'
import { Link } from 'react-router-dom'
import { setFeedback } from '../actions/feedback'

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
      <div className='mt-2 flex full__width align__center justify__center'>
        <Link className='full__width' to='/jobs'>
          <Button className='button-style ml-5' variant='outlined' color='primary'>
            {translation.lookingForAJob}
          </Button>
        </Link>
        <Button className='button-style mr-5' onClick={() => dispatch(openDialog({ type: 'AddJob', title: 'addJob' }))} variant='outlined' color='primary'>
          {translation.addJob}
        </Button>
      </div>
    </PageContainer>
  )
}

export default Home
