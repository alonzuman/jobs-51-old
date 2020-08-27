import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSavedJobs } from '../../actions'
import CardsSkeletons from '../cards/CardsSkeletons'
import { Grid, Typography, Paper, Box } from '@material-ui/core'
import JobCard from '../cards/JobCard'
import PageHeader from '../layout/PageHeader'

const SavedJobs = () => {
  const authState = useSelector(state => state.auth)
  const { savedJobsLoading, savedJobs } = useSelector(state => state.jobs)
  const { translation, theme } = useSelector(state => state.theme)
  const dispatch = useDispatch()

  useEffect(() => {
    if (authState?.savedJobs?.length > 0) {
      dispatch(getSavedJobs({ savedJobs: authState?.savedJobs }))
    }
  }, [authState])

  const boxStyle = {
    padding: '1rem',
    paddingBottom: '4.5rem'
  }

  return (
    <>
      <PageHeader title={translation.savedJobs} />
      <Box style={boxStyle}>
        {savedJobsLoading && <CardsSkeletons count={1} />}
        {!savedJobsLoading && savedJobs?.length === 0 && <Typography variant='body1'>{translation.couldntFindSavedJobs}</Typography>}
        {!savedJobsLoading && savedJobs &&
        <Grid container spacing={2}>
          {savedJobs.length > 0 && savedJobs.map((job, index) => <JobCard key={index} job={job} />)}
        </Grid>}
      </Box>
    </>
  )
}

export default SavedJobs
