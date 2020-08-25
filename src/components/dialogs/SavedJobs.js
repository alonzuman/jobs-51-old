import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSavedJobs } from '../../actions'
import CardsSkeletons from '../cards/CardsSkeletons'
import { Grid, Typography, Paper, Box } from '@material-ui/core'
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

  const paperStyle = {
    padding: '0 1rem',
    borderBottom: `1px solid ${theme.palette.border.main}`
  }

  const boxStyle = {
    padding: '1rem',
    paddingBottom: '4.5rem'
  }

  return (
    <div style={{ direction: 'rtl' }}>
      <Paper style={paperStyle} elevation={0} square>
        <Typography variant='h1'>{translation.savedJobs}</Typography>
      </Paper>
      <Box style={boxStyle}>
        {savedJobsLoading && <CardsSkeletons count={1} />}
        {!savedJobsLoading && savedJobs?.length === 0 && <Typography variant='body1'>{translation.couldntFindSavedJobs}</Typography>}
        {!savedJobsLoading && savedJobs &&
        <Grid container spacing={2}>
          {savedJobs.length > 0 && savedJobs.map((job, index) => <JobCard key={index} job={job} />)}
        </Grid>}
      </Box>
    </div>
  )
}

export default SavedJobs
