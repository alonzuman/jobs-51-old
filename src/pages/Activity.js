import React, { useEffect } from 'react'
import { Paper, Typography, Fab, List, Box, Grid } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import AddIcon from '@material-ui/icons/Add'
import { openDialog } from '../actions/dialogs'
import { getMyActivities, addActivity } from '../actions/activities'
import CircularSpinnerWithContainer from '../components/layout/CircularSpinnerWithContainer'
import CardsSkeletons from '../components/cards/CardsSkeletons'
import ActivityCard from '../components/cards/ActivityCard'
import PageHeader from '../components/layout/PageHeader'

const Activity = () => {
  const dispatch = useDispatch()
  const { loading, activities } = useSelector(state => state.activities)
  const { translation, theme } = useSelector(state => state.theme)
  const { pending, approved } = useSelector(state => state.auth).activities

  useEffect(() => {
    dispatch(getMyActivities())
  }, [])

  const paperStyle = {
    padding: '0 1rem',
    borderBottom: `1px solid ${theme.palette.border.main}`
  }

  const boxStyle = {
    padding: '1rem'
  }

  const fabStyle = {
    position: 'fixed',
    margin: '0 auto',
    bottom: '4.5rem',
    left: '50%',
    transform: 'translate(-50%, 0)'
  }

  const statsPaperStyle = {
    width: '100%',
    height: 120,
    display: 'flex',
    borderRadius: '1rem',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  }

  return (
    <>
      <Fab variant='extended' color='primary' onClick={() => dispatch(openDialog({ type: 'AddActivity', title: 'addActivity' }))} style={fabStyle}>
        <AddIcon />
        <span style={{ margin: '0 .5rem' }}>{translation.addActivity}</span>
      </Fab>
      <PageHeader title={translation.activity} />
      <Box style={boxStyle}>
        <Typography variant='h2'>{translation.latestActivities}</Typography>
        <Grid container spacing={2}>
          <Grid xs={6} md={6} lg={6} item>
            <Paper style={statsPaperStyle} elevation={0}>
              <Typography variant='h1'>{pending}</Typography>
              <Typography variant='body1'>{translation.pending}</Typography>
            </Paper>
          </Grid>
          <Grid xs={6} md={6} lg={6} item>
            <Paper style={statsPaperStyle} elevation={0}>
              <Typography variant='h1'>{approved}</Typography>
              <Typography variant='body1'>{translation.approved}</Typography>
            </Paper>
          </Grid>
        </Grid>
        <Typography variant='h2'>{translation.latestActivities}</Typography>
        {loading && <CardsSkeletons count={1} />}
        {!loading && activities.length === 0 && <Typography variant='body1'>{translation.activitiesEmptyState}</Typography>}
        {!loading && activities &&
        <List>{activities?.map((activity, index) => <ActivityCard key={index} activity={activity} />)}</List>}
      </Box>
    </>
  )
}

export default Activity
