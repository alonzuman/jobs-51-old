import { Avatar, Badge } from '@material-ui/core';
import React, { useState } from 'react'
import ActivitiesProgress from '../../../components/molecules/ActivitiesProgress';
import NotificationsDialog from '../../../components/layout/NotificationsDialog';
import useCurrentUser from '../../../hooks/useCurrentUser';
import useNotifications from '../../../hooks/useNotifications';

const ActivityPageAvatar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { volunteer, avatar, firstName, activities, isFetched: userFetched } = useCurrentUser();
  const { unseen, isFetched: notificationsFetched } = useNotifications();

  const openNotifications = e => {
    setAnchorEl(e.currentTarget)
  };

  const closeNotifications = () => {
    setAnchorEl(null)
  };

  const badgeAnchor = {
    horizontal: 'left',
    vertical: 'top'
  }

  if (userFetched && !volunteer) return <Avatar className='avatar__md' src={avatar}>{firstName?.charAt(0)}</Avatar>

  if (userFetched && notificationsFetched) {
    return (
      <>
        <NotificationsDialog isOpen={!!anchorEl} onClose={closeNotifications} anchorEl={anchorEl} />
        <Badge anchorOrigin={badgeAnchor} badgeContent={unseen?.length} color='error'>
          <ActivitiesProgress onClick={openNotifications} approved={activities.approved} pending={activities.pending}>
            <Avatar className='avatar__md' src={avatar}>{firstName?.charAt(0)}</Avatar>
          </ActivitiesProgress>
        </Badge>
      </>
    )
  } else {
    return null;
  }
}

export default ActivityPageAvatar
