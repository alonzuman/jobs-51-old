import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getJobs, openDialog } from '../actions'
import JobCard from '../components/cards/JobCard'
import CardsSkeletons from '../components/cards/CardsSkeletons'
import { Grid, Typography, Container } from '@material-ui/core'
import FiltersBar from '../components/layout/FiltersBar'

const Jobs = () => {
  const { translation } = useSelector(state => state.theme)
  const { jobs, loading } = useSelector(state => state.jobs)
  const dispatch = useDispatch()
  useEffect(() => { dispatch(getJobs()) }, [dispatch])

  const filters = [
    // { label: translation.datePosted, onClick: () => dispatch(openDatesFilterDialog()) },
    { label: translation.categories, onClick: () => dispatch(openDialog({ type: 'ChipsWithInputFilter', title: 'categories' }))  },
    { label: translation.location, onClick: () => dispatch(openDialog({ type: 'ChipsWithInputFilter', title: 'location' }))  },
  ]

  const gridStyle = {
    direction: 'rtl',
    padding: '0 0 1rem 0'
  }

  return (
    <Container>
    <FiltersBar filters={filters} />
    {loading && <CardsSkeletons />}
    <Grid style={gridStyle} container spacing={2}>
      {(jobs?.length === 0 && !loading) && <Typography variant='body1'>{translation?.couldntFindJobs}</Typography>}
      {!loading && jobs?.map((job, index) => <JobCard key={index} job={job} />)}
    </Grid>
    </Container>
  )
}

export default Jobs
