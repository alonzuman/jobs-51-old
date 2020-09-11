import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSavedJobs } from '../../actions'
import CardsSkeletons from '../skeletons/CardsSkeletons'
import { Grid, Typography } from '@material-ui/core'
import JobCard from '../cards/JobCard'
import TopBar from '../layout/TopBar'
import PageContainer from '../layout/PageContainer'

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
    <>
      <TopBar title={translation.savedJobs} />
      <PageContainer>
        {savedJobsLoading && <CardsSkeletons count={1} />}
        {!savedJobsLoading && savedJobs?.length === 0 && <Typography variant='body1'>{translation.couldntFindSavedJobs}</Typography>}
        {!savedJobsLoading && savedJobs &&
        <Grid className='cards__container' container spacing={2}>
          {savedJobs.length > 0 && savedJobs.map((job, index) => <JobCard key={index} job={job} />)}
        </Grid>}
      </PageContainer>
    </>
  )
}

export default SavedJobs
