import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getJobs, openLocationFilterDialog, openDatesFilterDialog, openJobTypeFilterDialog } from '../actions'
import JobCard from '../components/cards/JobCard'
import CardsSkeletons from '../components/cards/CardsSkeletons'
import { Grid, Typography } from '@material-ui/core'
import FiltersBar from '../components/layout/FiltersBar'

const Jobs = () => {
  const { translation } = useSelector(state => state.theme)
  const { jobs, loading } = useSelector(state => state.jobs)
  const dispatch = useDispatch()
  useEffect(() => { dispatch(getJobs()) }, [dispatch])

  const filters = [
    // { label: translation.datePosted, onClick: () => dispatch(openDatesFilterDialog()) },
    { label: translation.type, onClick: () => dispatch(openJobTypeFilterDialog())  },
    { label: translation.location, onClick: () => dispatch(openLocationFilterDialog())  },
  ]

  const gridStyle = {
    direction: 'rtl',
    padding: '1rem 0'
  }

  return (
    <>
    <FiltersBar filters={filters} />
    <Grid style={gridStyle} container spacing={2}>
      {(jobs?.length === 0 && !loading) && <Typography variant='body1'>{translation?.couldntFindJobs}</Typography>}
      {loading && <CardsSkeletons />}
      {!loading && jobs?.map((job, index) => <JobCard key={index} job={job} />)}
    </Grid>
    </>
  )
}

export default Jobs
