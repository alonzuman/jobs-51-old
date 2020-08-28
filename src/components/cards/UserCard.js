import React from 'react'
import { Grid, Avatar, Paper, Card, CardHeader, Chip } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UserCard = ({ user }) => {
  const { translation } = useSelector(state => state.theme)
  return (
    <Grid item xs={12} md={6} lg={4}>
      <Link to={`/users/${user.uid}`}>
        <Paper>
        <Card>
          <CardHeader
            avatar={<Avatar src={user.avatar} alt={user.firstName}>{user.firstName.charAt(0)}</Avatar>}
            title={`${user.firstName} ${user.lastName}`}
            subheader={user.serviceYear ? `${translation.joined} ${user.serviceYear}` : ''}
            action={<Chip size='small' color='primary' variant='outlined' label={translation.roles[user.role]} />}
          />
        </Card>
        </Paper>
      </Link>
    </Grid>
  )
}

export default UserCard
