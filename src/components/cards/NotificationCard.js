import { Card, CardHeader, Chip } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { markSeen } from '../../actions';
import moment from 'moment'
import 'moment/locale/he'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const NotificationCard = ({ notification }) => {
  const { translation } = useSelector(state => state.theme)
  const { seen, msg, activity } = notification;
  const [isSeen, setIsSeen] = useState(seen)
  const dispatch = useDispatch()

  const timeAgo = () => {
    moment.locale('he')
    return moment(notification?.dateCreated).fromNow()
  }

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
    switch (msg) {
      case 'activityApproved': return `${translation.theActivity} "${activity.type}" ${translation.inDate} ${activityDate()} ${translation.isApproved}`;
      default: return null
    }
  }

  return (
    <Card className='clickable' onClick={markAsSeen} variant='outlined'>
      <CardHeader
        title={<Chip size='small' label={timeAgo()} variant='outlined' color='primary' />}
        subheader={notificationBody()}
        action={isSeen ? '' : <FiberManualRecordIcon color='primary' />}
      />
    </Card>
  )
}

export default NotificationCard
