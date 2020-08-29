import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getJobs, openDialog } from '../actions'
import JobCard from '../components/cards/JobCard'
import CardsSkeletons from '../components/skeletons/CardsSkeletons'
import { Grid, Typography, Fab, Container, Paper, Box } from '@material-ui/core'
import FiltersBar from '../components/layout/FiltersBar'
import TopBar from '../components/layout/TopBar'
import AddIcon from '@material-ui/icons/Add'
import FloatingActionButton from '../components/layout/FloatingActionButton'

const Jobs = () => {
  const { translation } = useSelector(state => state.theme)
  const { jobs, loading, filters } = useSelector(state => state.jobs)
  const dispatch = useDispatch()
  useEffect(() => { dispatch(getJobs()) }, [dispatch, filters])

  const filtersBar = [
    { type: 'categories', label: translation.categories, onClick: () => dispatch(openDialog({ type: 'CategoriesFilter', title: 'categories' }))  },
    { type: 'locations',  label: translation.location, onClick: () => dispatch(openDialog({ type: 'LocationsFilter', title: 'location' }))  },
    { type: 'dates', label: translation.datePosted, onClick: () => dispatch(openDialog({ type: 'DatesFilter', title: 'datePosted' })) },
  ]

  const containerStyle = {
    padding: '1rem'
  }

  const fabStyle = {
    position: 'fixed',
    margin: '0 auto',
    bottom: '4.5rem',
    left: '50%',
    transform: 'translate(-50%, 0)'
  }

  return (
    <>
      <FloatingActionButton color='primary' variant='extended' title={translation.addJob} action={() => dispatch(openDialog({ type: 'AddJob', title: 'addJob' }))}>
        <AddIcon />
      </FloatingActionButton>
      <TopBar title={translation.findJob}>
        <FiltersBar filterOptions={filtersBar} />
      </TopBar>
      <Container style={containerStyle}>
        {loading && <CardsSkeletons />}
        <Grid container spacing={2}>
          {(jobs?.length === 0 && !loading) && <Typography color='textPrimary' variant='body1'>{translation?.couldntFindJobs}</Typography>}
          {!loading && jobs?.map((job, index) => <JobCard key={index} job={job} />)}
        </Grid>
      </Container>
    </>
  )
}

export default Jobs
