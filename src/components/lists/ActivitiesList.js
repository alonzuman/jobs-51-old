import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Typography, List, Grid } from '@material-ui/core'
import ActivityCard from '../cards/ActivityCard'
import CardsSkeletons from '../skeletons/CardsSkeletons'
import { getMyActivities, getActivities } from '../../actions'

const ActivitiesList = ({ type = 'personal' }) => {
  const { translation } = useSelector(state => state.theme)
  const { loading, activities, filters } = useSelector(state => state.activities)
  const dispatch = useDispatch()

  useEffect(() => {
    if (type === 'personal') {
      dispatch(getMyActivities())
    } else if (type !== 'otherUser') {
      dispatch(getActivities())
    }
  }, [filters, dispatch, type])

  if (loading) {
    return <CardsSkeletons count={1} />
  } else if (!loading && activities.length === 0) {
    return <Typography variant='body1'>{translation.activitiesEmptyState}</Typography>
  } else {
    return <Grid className='cards__container' container spacing={2}>{activities?.map((activity, index) => <ActivityCard showUser={type !== 'personal'} key={index} activity={activity} />)}</Grid>
  }
}

export default ActivitiesList
