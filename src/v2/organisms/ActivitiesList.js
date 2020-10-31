import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Typography, Grid } from '@material-ui/core'
import ActivityCard from '../molecules/ActivityCard'
import CardsSkeletons from './CardsSkeletons'

const ActivitiesList = ({ activities, loading, showUser = false }) => {
  const { translation } = useSelector(state => state.theme)

  if (loading) {
    return <CardsSkeletons className='p-0' count={1} />
  } else if (!loading && activities?.length === 0) {
    return <Typography variant='body1'>{translation.activitiesEmptyState}</Typography>
  } else {
    return (
      <Grid container spacing={2}>
        {activities?.map((activity, index) => (
          <Grid key={index} item xs={12} md={12} lg={12}>
            <ActivityCard showUser={showUser} activity={activity} />
          </Grid>)
        )}
      </Grid>
    )
  }
}

export default ActivitiesList
