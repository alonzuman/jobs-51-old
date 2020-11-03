import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Typography, Grid, List } from '@material-ui/core'
import ActivityCard from '../molecules/ActivityCard'
import CardsSkeletons from './CardsSkeletons'

const ActivitiesList = ({ activities, loading, showUser = false }) => {
  const { translation } = useSelector(state => state.theme)

  if (loading) {
    return <CardsSkeletons size='large' count={1} disableGutters />
  } else if (!loading && activities?.length !== 0) {
    return (
      <List>
        {activities?.map((activity, index) => (
          <ActivityCard key={index} showUser={showUser} activity={activity} />)
        )}
      </List>
    )
  } else {
    return <Typography variant='body1'>{translation.activitiesEmptyState}</Typography>
  }
}

export default ActivitiesList
