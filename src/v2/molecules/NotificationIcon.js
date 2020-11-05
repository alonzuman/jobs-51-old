import { Badge } from '@material-ui/core'
import React from 'react'
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import { useSelector } from 'react-redux';

const NotificationIcon = ({ ...rest }) => {
  const { unseen, isFetching } = useSelector(state => state.notifications)

  if (isFetching) {
    return (
      <NotificationsNoneIcon {...rest}/>
    )
  } else {
    return (
      <Badge badgeContent={unseen?.length} color='error'>
        <NotificationsNoneIcon {...rest} />
      </Badge>
    )
  }
}

export default NotificationIcon
