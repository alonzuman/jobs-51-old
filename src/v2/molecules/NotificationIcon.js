import { Badge, IconButton } from '@material-ui/core'
import React from 'react'
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import { useSelector } from 'react-redux';

const NotificationIcon = ({ disableRipple = false }) => {
  const { uid } = useSelector(state => state.auth)
  const { unseen, loading } = useSelector(state => state.notifications)

  if (loading) {
    return (
        <IconButton disableRipple={disableRipple} size='small'>
          <NotificationsNoneIcon />
        </IconButton>
    )
  } else {
    return (
        <IconButton disableRipple={disableRipple} size='small'>
          <Badge badgeContent={unseen?.length} color='error'>
            <NotificationsNoneIcon />
          </Badge>
        </IconButton>
    )
  }
}

export default NotificationIcon
