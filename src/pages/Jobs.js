import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getJobs, openLocationFilterDialog, openDatesFilterDialog, openJobTypeFilterDialog } from '../actions'
import JobCard from '../components/cards/JobCard'
import CardsSkeletons from '../components/cards/CardsSkeletons'
import { Grid } from '@material-ui/core'
import FiltersBar from '../components/layout/FiltersBar'

const Jobs = () => {
  const { translation } = useSelector(state => state.theme)
  const { jobs, loading } = useSelector(state => state.jobs)
  const dispatch = useDispatch()
  useEffect(() => { dispatch(getJobs()) }, [])

  const filters = [
    { label: translation.datePosted, onClick: () => dispatch(openDatesFilterDialog()), values: ['היי', 'ביי'] },
    { label: translation.type, onClick: () => dispatch(openJobTypeFilterDialog()), values: ['היי', 'ביי']  },
    { label: translation.location, onClick: () => dispatch(openLocationFilterDialog()), values: ['היי', 'ביי']  },
  ]

  const gridStyle = {
    direction: 'rtl',
    padding: '1rem 0'
  }

  return (
    <>
    <FiltersBar filters={filters} />
    <Grid style={gridStyle} container spacing={2}>
      {(jobs?.length === 0 && !loading) && <h1>{translation?.couldntFindJobs}</h1>}
      {loading && <CardsSkeletons />}
      {!loading && jobs?.map((job, index) => <JobCard key={index} job={job} />)}
    </Grid>
    </>
  )
}

export default Jobs
