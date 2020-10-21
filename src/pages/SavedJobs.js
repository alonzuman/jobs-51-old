import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSavedJobs } from '../actions'
import CardsSkeletons from '../components/skeletons/CardsSkeletons'
import { Grid, Typography } from '@material-ui/core'
import JobCard from '../components/cards/JobCard'
import PageContainer from '../components/layout/PageContainer'
import PageHeader from '../v2/organisms/PageHeader'

const SavedJobs = () => {
  const authState = useSelector(state => state.auth)
  const { savedJobsLoading, savedJobs } = useSelector(state => state.jobs)
  const { translation } = useSelector(state => state.theme)
  const dispatch = useDispatch()

  useEffect(() => {
    if (authState?.savedJobs?.length > 0) {
      dispatch(getSavedJobs({ savedJobs: authState?.savedJobs }))
    }
  }, [authState, dispatch])

  return (
    <PageContainer>
      <PageHeader spaceTop spaceBottom title={translation.savedJobs} />
      {savedJobsLoading && <CardsSkeletons count={1} />}
      {!savedJobsLoading && savedJobs?.length === 0 && <Typography variant='body1'>{translation.couldntFindSavedJobs}</Typography>}
      {!savedJobsLoading && savedJobs &&
        <Grid container spacing={2}>
          {savedJobs.length > 0 && savedJobs.map((job, index) => <Grid item xs={12} md={6} lg={6}><JobCard key={index} job={job} /></Grid>)}
        </Grid>}
    </PageContainer>
  )
}

export default SavedJobs
