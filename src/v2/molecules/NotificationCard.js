import { Avatar, Chip, Divider, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { markSeen } from '../../actions';
import moment from 'moment'
import 'moment/locale/he'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const NotificationCard = ({ notification }) => {
  const { translation } = useSelector(state => state.theme)
  const { seen, type, activity, notificationBy } = notification;
  const [isSeen, setIsSeen] = useState(seen)
  const dispatch = useDispatch()

  const timeAgo = () => {
    moment.locale('he')
    return moment(notification?.dateCreated).fromNow()
  }

  const autoApprove = () => {
    setTimeout(async () => {
      await dispatch(markSeen(notification))
      await setIsSeen(true)
    }, 5000);
  }

  useEffect(() => {
    autoApprove()
  }, [])

  const markAsSeen = async () => {
    if (!seen) {
      await dispatch(markSeen(notification))
      await setIsSeen(true)
    }
  }

  const activityDate = () => {
    const splitDate = activity?.date?.split('-');
    return `${splitDate[2]}/${splitDate[1]}`
  }

  const notificationBody = () => {
    switch (type) {
      case 'activityApproved': return `${translation.theActivity} "${activity.type}" ${translation.inDate} ${activityDate()} ${translation.isApproved} ${notificationBy?.firstName ? translation.by : ''} ${notificationBy?.firstName || ''} ${notificationBy?.lastName || ''} `;
      default: return null
    }
  }

  return (
    <>
      <ListItem button onClick={markAsSeen}>
        <ListItemAvatar>
          <Avatar src={notificationBy?.avatar}>{notificationBy?.firstName?.charAt(0)}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={<Chip className='mb-25' size='small' label={timeAgo()} variant='outlined' color='primary' />}
          secondary={notificationBody()}
        />
        <ListItemSecondaryAction>
          {isSeen ? '' : <FiberManualRecordIcon color='primary' />}
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </>
  )
}

export default NotificationCard
