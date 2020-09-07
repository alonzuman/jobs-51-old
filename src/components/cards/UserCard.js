import React from 'react'
import { Grid, Avatar, Paper, CardHeader, Chip, ListItem } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CardContainer from './CardContainer'
import CustomChip from './CustomChip'

const UserCard = ({ user }) => {
  const { translation } = useSelector(state => state.theme)
  const paperStyle = {
    borderRadius: '1rem'
  }

  return (
    <Grid item xs={12} md={6} lg={4}>
      <ListItem className='br-1' button>
        <Link className='full__width' to={`/users/${user.uid}`}>
          <Paper style={paperStyle} elevation={0}>
            <CardContainer>
              <CardHeader
                avatar={<Avatar src={user.avatar} alt={user.firstName}>{user.firstName.charAt(0)}</Avatar>}
                title={`${user.firstName} ${user.lastName}`}
                subheader={user.serviceYear ? `${translation.joined} ${user.serviceYear}` : ''}
                action={<CustomChip size='small' color='primary' variant='outlined' label={translation.roles[user.role]} />}
              />
            </CardContainer>
          </Paper>
        </Link>
      </ListItem>
    </Grid>
  )
}

export default UserCard
