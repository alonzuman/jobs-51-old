import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Grid, Typography } from '@material-ui/core'
import UserCard from '../cards/UserCard'
import CardsSkeletons from '../skeletons/CardsSkeletons'
import { getUsers } from '../../actions/users'

const UsersList = () => {
  const { loading, users, filters } = useSelector(state => state.users)
  const { translation } = useSelector(state => state.theme)
  const dispatch = useDispatch()

  useEffect(() => { dispatch(getUsers()) }, [filters, dispatch])

  if (loading) {
    return <CardsSkeletons count={5} />
  } else if (!loading && users.length === 0) {
    return <Typography variant='body1'>{translation.usersEmptyState}</Typography>
  } else {
    return (
      <Grid container spacing={2}>
        {users?.map((user, index) => <UserCard key={index} user={user} />)}
      </Grid>
    )
  }

}

export default UsersList
