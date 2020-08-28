import React from 'react'
import { Paper, Typography, Fab, Grid, Container } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import AddIcon from '@material-ui/icons/Add'
import { openDialog } from '../actions/dialogs'
import ActivitiesList from '../components/lists/ActivitiesList'
import TopBar from '../components/layout/TopBar'

const Activity = () => {
  const dispatch = useDispatch()
  const { translation } = useSelector(state => state.theme)
  const { pending, approved } = useSelector(state => state.auth).activities

  const fabStyle = {
    position: 'fixed',
    margin: '0 auto',
    bottom: '4.5rem',
    left: '50%',
    transform: 'translate(-50%, 0)',
    zIndex: 999
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
      <TopBar title={translation.activity} />
      <Container>
        <Typography variant='h2'>{translation.totalActivities}</Typography>
        <Grid  container spacing={2}>
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
        <ActivitiesList type='personal' />
      </Container>
    </>
  )
}

export default Activity
