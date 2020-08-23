import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSavedJobs } from '../../actions'
import CardsSkeletons from '../cards/CardsSkeletons'
import { Grid, Typography, Container } from '@material-ui/core'
import JobCard from '../cards/JobCard'

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

  const gridStyle = {
    padding: '.5rem'
  }

  return (
    <Container style={{direction: 'rtl'}}>
      {/* TODO */}
      <Typography style={{color: theme.palette.type === 'dark' ? 'white' : 'black' }} variant='h1'>{translation.savedJobs}</Typography>
      {savedJobsLoading && <CardsSkeletons count={1} />}
      {!savedJobsLoading && savedJobs?.length === 0 && <Typography variant='body1'>{translation.couldntFindSavedJobs}</Typography>}
      {!savedJobsLoading && savedJobs &&
      <Grid style={gridStyle} container spacing={2}>
        {savedJobs.length > 0 && savedJobs.map((job, index) => <JobCard key={index} job={job} />)}
      </Grid>}
    </Container>
  )
}

export default SavedJobs
