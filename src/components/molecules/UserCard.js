import React from 'react'
import { Avatar, ListItem, ListItemAvatar, ListItemText, Divider, ListItemSecondaryAction, Chip } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { userSecondayText } from '../../utils'
import styled from 'styled-components'
import ActivitiesProgress from './ActivitiesProgress'

const ListItemPrimaryText = styled.span`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  width: 100%;
`

const UserCard = ({ user }) => {
  const { translation } = useSelector(state => state.theme)

  const listItemPrimaryText = (
    <ListItemPrimaryText>
      {`${user?.firstName} ${user?.lastName}`}
      <Chip color='primary' variant='outlined' size='small' label={translation.roles[user?.role]} />
    </ListItemPrimaryText>
  )

  return (
    <Link className="full__width" to={`/users/${user?.uid}`}>
      <ListItem button>
        <ListItemAvatar>
          <ActivitiesProgress size={48} approved={user?.activities?.approved} pending={user?.activities?.pending}>
            <Avatar alt={`${user?.firstName}`} src={user?.avatar}>{user?.firstName.charAt(0)}</Avatar>
          </ActivitiesProgress>
        </ListItemAvatar>
        <ListItemText
          primary={listItemPrimaryText}
          secondary={userSecondayText(user)}
        />
      </ListItem>
      <Divider />
    </Link>
  );
}

export default UserCard
