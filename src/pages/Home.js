import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openDialog, addJob, getJobs, openAddingJob } from '../actions'
import Jobs from './Jobs'
import { Button, Typography } from '@material-ui/core'
import PageContainer from '../components/layout/PageContainer'

const Home = () => {
  const dispatch = useDispatch()
  const { translation } = useSelector(state => state.theme)

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  }

  return (
    <PageContainer style={containerStyle}>
      <Typography variant='h1'>{translation.homeText1}</Typography>
      <Typography variant='body1'>{translation.landingPageText1}</Typography>
      <Button>
        {translation.lookingForAJob}
      </Button>
      <Button>
        {translation.lookingForAnActivity}
      </Button>
    </PageContainer>
  )
}

export default Home
