import { Card, CardHeader, Chip } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { markSeen } from '../../actions';
import moment from 'moment'
import 'moment/locale/he'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const NotificationCard = ({ notification }) => {
  const { translation } = useSelector(state => state.theme)
  const { seen, type, activity } = notification;
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
      case 'activityApproved': return `${translation.theActivity} "${activity.type}" ${translation.inDate} ${activityDate()} ${translation.isApproved}`;
      default: return null
    }
  }

  return (
    <Card className='clickable' onClick={markAsSeen} variant='outlined'>
      <CardHeader
        className='pt-5 pb-5 pl-1 pr-1'
        title={<Chip size='small' label={timeAgo()} variant='outlined' color='primary' />}
        subheader={notificationBody()}
        action={isSeen ? '' : <FiberManualRecordIcon color='primary' />}
      />
    </Card>
  )
}

export default NotificationCard
