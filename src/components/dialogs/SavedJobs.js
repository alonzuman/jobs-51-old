import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSavedJobs } from '../../actions'
import CardsSkeletons from '../cards/CardsSkeletons'
import { Grid, Typography } from '@material-ui/core'
import JobCard from '../cards/JobCard'

const SavedJobs = () => {
  const authState = useSelector(state => state.auth)
  const { savedJobsLoading, savedJobs } = useSelector(state => state.jobs)
  const { translation } = useSelector(state => state.theme)
  const dispatch = useDispatch()

  useEffect(() => {
    if (authState.savedJobs.length > 0) {
      dispatch(getSavedJobs({ savedJobs: authState?.savedJobs }))
    }
  }, [])

  const gridStyle = {
    paddingBottom: '1rem'
  }

  return (
    <div style={{width: '100%', height: '100%'}}>
      {savedJobsLoading && <CardsSkeletons count={1} />}
      {!savedJobsLoading && authState?.savedJobs.length === 0 && <Typography variant='body1'>{translation.couldntFindSavedJobs}</Typography>}
      {!savedJobsLoading && savedJobs &&
      <Grid style={gridStyle} container spacing={1}>
        {savedJobs.map((job, index) => <JobCard key={index} job={job} />)}
      </Grid>}
    </div>
  )
}

export default SavedJobs
