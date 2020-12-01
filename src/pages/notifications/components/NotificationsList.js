import { Grid, List, Typography } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import NotificationCard from '../../../components/molecules/NotificationCard'
import CardsSkeletons from '../../../components/organisms/CardsSkeletons'

const NotificationsList = ({ loading, all }) => {
  const { translation } = useSelector(state => state.theme)


  if (loading) {
    return <CardsSkeletons disableGutters count={1} size='small' />
  } else if (!loading && all?.length !== 0) {
    return (
      <List>
        {all?.map((v, i) => <NotificationCard notification={v} key={i} />)}
      </List>
    )
  } else {
    return <Typography variant='body1'>{translation.noDataToShow}</Typography>
  }
}

export default NotificationsList
