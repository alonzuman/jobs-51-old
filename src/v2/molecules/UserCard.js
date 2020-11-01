import React from 'react'
import { Avatar, ListItem, ListItemAvatar, ListItemText, Divider, ListItemSecondaryAction, Chip } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { userSecondayText } from '../../utils'

const UserCard = ({ user }) => {
  const { translation } = useSelector(state => state.theme)

  return (
    <Link className="full__width" to={`/users/${user?.uid}`}>
      <ListItem button>
        <ListItemAvatar>
          <Avatar alt={`${user?.firstName}`} src={user?.avatar}>{user?.firstName.charAt(0)}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={`${user?.firstName} ${user?.lastName}`}
          secondary={userSecondayText(user)}
        />
        <ListItemSecondaryAction style={{ top: 24 }}>
          <Chip color='primary' variant='outlined' size='small' label={translation.roles[user?.role]} />
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </Link>
  );
}

export default UserCard
