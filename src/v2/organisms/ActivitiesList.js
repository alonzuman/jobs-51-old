import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Typography, Grid, List } from '@material-ui/core'
import ActivityCard from '../molecules/ActivityCard'
import CardsSkeletons from './CardsSkeletons'

const ActivitiesList = ({ activities, loading, showUser = false }) => {
  const { translation } = useSelector(state => state.theme)

  if (loading) {
    return <CardsSkeletons size='big' count={1} />
  } else if (!loading && activities?.length === 0) {
    return <Typography variant='body1'>{translation.activitiesEmptyState}</Typography>
  } else {
    return (
      <List>
        {activities?.map((activity, index) => (
          <ActivityCard key={index} showUser={showUser} activity={activity} />)
        )}
      </List>
    )
  }
}

export default ActivitiesList
