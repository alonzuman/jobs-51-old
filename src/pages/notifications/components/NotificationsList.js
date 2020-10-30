import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import NotificationCard from '../../../components/cards/NotificationCard'
import CardsSkeletons from '../../../components/skeletons/CardsSkeletons'

const NotificationsList = ({ loading, all }) => {
  const { translation } = useSelector(state => state.theme)


  if (loading) {
    return (
      <CardsSkeletons count={1} className='p-0' />
    )
  } else if (!loading && all?.length !== 0) {
    return (
      <Grid>
        {all?.map((v, i) => <Grid item key={i}><NotificationCard notification={v} /></Grid>)}
      </Grid>
    )
  } else {
    return <Typography variant='body1'>{translation.noDataToShow}</Typography>
  }
}

export default NotificationsList
