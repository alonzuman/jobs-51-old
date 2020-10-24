import React from 'react'
import { useSelector } from 'react-redux'
import { Grid, Typography } from '@material-ui/core'
import UserCard from '../cards/UserCard'
import CardsSkeletons from '../skeletons/CardsSkeletons'

const UsersList = ({ loading, users }) => {
  const { translation } = useSelector(state => state.theme)

  if (loading) {
    return <CardsSkeletons count={1} className='p-0' />

  } else if (!loading && users.length !== 0) {
    return (
      <Grid container spacing={2}>
        {users?.map((user, index) => <UserCard key={index} user={user} />)}
      </Grid>
    )
  } else {
    return <Typography variant='body1'>{translation.usersEmptyState}</Typography>
  }
}

export default UsersList
