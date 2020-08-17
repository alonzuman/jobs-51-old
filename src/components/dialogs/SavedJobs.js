import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSavedJobs } from '../../actions'
import CardsSkeletons from '../cards/CardsSkeletons'
import { Grid } from '@material-ui/core'
import JobCard from '../cards/JobCard'

const SavedJobs = () => {
  const { savedJobs } = useSelector(state => state.auth)
  const { loading, jobs } = useSelector(state => state.jobs)
  const dispatch = useDispatch()

  useEffect(() => { dispatch(getSavedJobs({ savedJobs })) }, [])

  return (
    <div style={{width: '100%'}}>
      {loading && <CardsSkeletons />}
      {!loading &&
      <Grid container spacing={2}>
        {jobs.map((job, index) => <Grid item xs={12}><JobCard job={job} /></Grid>)}
      </Grid>}
    </div>
  )
}

export default SavedJobs
