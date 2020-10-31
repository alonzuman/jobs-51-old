import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import NotificationCard from '../../../v2/molecules/NotificationCard'
import CardsSkeletons from '../../../v2/organisms/CardsSkeletons'

const NotificationsList = ({ loading, all }) => {
  const { translation } = useSelector(state => state.theme)


  if (loading) {
    return (
      <CardsSkeletons count={1} className='p-0' />
    )
  } else if (!loading && all?.length !== 0) {
    return (
      <Grid container spacing={2}>
        {all?.map((v, i) => <Grid xs={12} md={12} lg={12} item key={i}><NotificationCard notification={v} /></Grid>)}
      </Grid>
    )
  } else {
    return <Typography variant='body1'>{translation.noDataToShow}</Typography>
  }
}

export default NotificationsList
