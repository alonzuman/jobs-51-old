import React, { useEffect } from 'react'
import { Paper, Typography, Fab, Grid, Box } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import AddIcon from '@material-ui/icons/Add'
import { openDialog } from '../actions/dialogs'
import { getMyActivities, addActivity } from '../actions/activities'
import CircularSpinnerWithContainer from '../components/layout/CircularSpinnerWithContainer'
import CardsSkeletons from '../components/cards/CardsSkeletons'

const Activity = () => {
  const dispatch = useDispatch()
  const { loading, activities } = useSelector(state => state.activities)
  const { translation, theme } = useSelector(state => state.theme)

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

  return (
    <div style={{ direction: 'rtl' }}>
      <Fab variant='extended' color='primary' onClick={() => dispatch(openDialog({ type: 'AddActivity', title: 'addActivity' }))} style={fabStyle}>
        <AddIcon />
        <span style={{ margin: '0 .5rem' }}>{translation.addActivity}</span>
      </Fab>
      <Paper style={paperStyle} elevation={0} square>
        <Typography variant='h1'>{translation.activity}</Typography>
      </Paper>
      <Box style={boxStyle}>
        {loading && <CardsSkeletons count={1} />}
        {!loading && activities.length === 0 && <Typography variant='body1'>{translation.activitiesEmptyState}</Typography>}
        {!loading && activities &&
        <Grid container spacing={2}>
          {activities?.map((activity, index) =>
            <Grid key={index} item xs={12} md={6} lg={4}>
              <h3>{activity.description}</h3>
            </Grid>)}
        </Grid>}
      </Box>
    </div>
  )
}

export default Activity
