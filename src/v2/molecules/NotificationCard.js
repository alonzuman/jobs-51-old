import { Avatar, Chip, Divider, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { markSeen } from '../../actions';
import moment from 'moment'
import 'moment/locale/he'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import useCurrentUser from '../../hooks/useCurrentUser';

const ListItemPrimaryText = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

const NotificationCard = ({ notification }) => {
  const { translation } = useSelector(state => state.theme)
  const { uid } = useCurrentUser()
  const { seen, type, activity, notificationBy } = notification;
  const [isSeen, setIsSeen] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    setIsSeen(seen)
  }, [seen])

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
    if (!seen) {
      autoApprove()
    }
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

  const listItemSecondaryText = () => {
    switch (type) {
      case 'activityApproved': return `${translation.theActivity} "${activity.type}" ${translation.inDate} ${activityDate()} ${translation.isApproved} ${notificationBy?.firstName ? translation.by : ''} ${notificationBy?.firstName || ''} ${notificationBy?.lastName || ''} `;
      default: return null
    }
  }

  const listItemPrimaryText = (
    <ListItemPrimaryText>
      <Chip className='mb-25' size='small' label={timeAgo()} variant='outlined' color='primary' />
      {isSeen ? '' : <FiberManualRecordIcon color='primary' />}
    </ListItemPrimaryText>
  )

  return (
    <>
      <ListItem alignItems='flex-start' button onClick={markAsSeen}>
        <ListItemAvatar>
          <Link to={notificationBy?.uid ? `/users/${notificationBy?.uid}` : `/${uid}/notifications`}>
            <Avatar src={notificationBy?.avatar}>{notificationBy?.firstName?.charAt(0)}</Avatar>
          </Link>
        </ListItemAvatar>
        <ListItemText
          primary={listItemPrimaryText}
          secondary={listItemSecondaryText()}
        />
      </ListItem>
      <Divider />
    </>
  )
}

export default NotificationCard
