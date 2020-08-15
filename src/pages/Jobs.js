import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getJobs } from '../actions'
import JobCard from '../components/cards/JobCard'
import CardsSkeletons from '../components/cards/CardsSkeletons'
import { Grid } from '@material-ui/core'

const Jobs = () => {
  const { translation } = useSelector(state => state.theme)
  const { jobs, loading } = useSelector(state => state.jobs)
  const dispatch = useDispatch()
  useEffect(() => { dispatch(getJobs()) }, [])

  return (
    <Grid container spacing={2}>
      {(jobs?.length === 0 && !loading) && <h1>{translation?.couldntFindJobs}</h1>}
      {loading && <CardsSkeletons />}
      {!loading && jobs?.map((job, index) => <JobCard key={index} job={job} />)}
    </Grid>
  )
}

export default Jobs
