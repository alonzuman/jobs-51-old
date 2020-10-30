import { Badge } from '@material-ui/core'
import React from 'react'
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import { useSelector } from 'react-redux';

const NotificationIcon = () => {
  const { unseen, loading } = useSelector(state => state.notifications)

  if (loading) {
    return (
      <NotificationsNoneIcon />
    )
  } else {
    return (
      <Badge badgeContent={unseen?.length} color='error'>
        <NotificationsNoneIcon />
      </Badge>
    )
  }
}

export default NotificationIcon
