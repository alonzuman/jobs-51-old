import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getJobs, openDialog } from '../actions'
import JobCard from '../components/cards/JobCard'
import CardsSkeletons from '../components/cards/CardsSkeletons'
import { Grid, Typography, Container, Paper } from '@material-ui/core'
import FiltersBar from '../components/layout/FiltersBar'

const Jobs = () => {
  const { translation } = useSelector(state => state.theme)
  const { jobs, loading, filters } = useSelector(state => state.jobs)
  const dispatch = useDispatch()
  useEffect(() => { dispatch(getJobs()) }, [dispatch, filters])

  const filtersBar = [
    // { label: translation.datePosted, onClick: () => dispatch(openDatesFilterDialog()) },
    { type: 'categories', label: translation.categories, onClick: () => dispatch(openDialog({ type: 'CategoriesFilter', title: 'categories' }))  },
    { type: 'locations',  label: translation.location, onClick: () => dispatch(openDialog({ type: 'LocationsFilter', title: 'location' }))  },
  ]

  const gridStyle = {
    direction: 'rtl',
    padding: '0 0 1rem 0'
  }

  return (
    <Container>
      <FiltersBar filterOptions={filtersBar} />
    {loading && <CardsSkeletons />}
    <Grid style={gridStyle} container spacing={2}>
        {(jobs?.length === 0 && !loading) && <Typography color='textPrimary' variant='h5'>{translation?.couldntFindJobs}</Typography>}
      {!loading && jobs?.map((job, index) => <JobCard key={index} job={job} />)}
    </Grid>
    </Container>
  )
}

export default Jobs
