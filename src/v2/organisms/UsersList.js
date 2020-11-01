import React from 'react'
import { useSelector } from 'react-redux'
import { Grid, List, Typography } from '@material-ui/core'
import UserCard from '../molecules/UserCard'
import CardsSkeletons from './CardsSkeletons'

const UsersList = ({ loading, users }) => {
  const { translation } = useSelector(state => state.theme)

  if (loading) {
    return <CardsSkeletons count={1} size='small' className='p-0' />
  } else if (!loading && users.length !== 0) {
    return (
      <List>
        {users?.map((user, index) => <UserCard key={index} user={user} />)}
      </List>
    )
  } else {
    return <Typography variant='body1'>{translation.usersEmptyState}</Typography>
  }
}

export default UsersList
