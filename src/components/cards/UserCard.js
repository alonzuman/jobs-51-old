import React from 'react'
import { Grid, Avatar, Paper, CardHeader, Chip, ListItem, Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CardContainer from './CardContainer'
import CustomChip from './CustomChip'
import { Skeleton } from '@material-ui/lab'
import PaperContainer from '../layout/PaperContainer'

const UserCard = ({ loading, user, containerStyle, label }) => {
  const { translation } = useSelector(state => state.theme)
  const paperStyle = {
    borderRadius: '1rem',
    padding: '0!important',
    width: '100%'
  }

  const cardHeaderStyle = {
    padding: label ? '0 1rem 1rem 1rem' : '1rem'
  }

  if (!user || loading) {
    return (
      <Grid item xs={12} md={6} lg={4}>
        <ListItem style={containerStyle} className='br-1' button>
          <PaperContainer style={paperStyle} elevation={0}>
            <CardContainer>
              <CardHeader
                style={cardHeaderStyle}
                avatar={<Skeleton className='mt-1' variant='circle' height={40} width={40} />}
                title={<Skeleton className='mt-1' variant='rect' height={24} width={120} />}
                subheader={<Skeleton className='mt-1' variant='rect' height={16} width={80} />}
              />
            </CardContainer>
          </PaperContainer>
        </ListItem>
      </Grid>
    )
  } else {
    return (
      <Grid item xs={12} md={6} lg={4}>
        <ListItem style={containerStyle} className="br-1" button>
          <Link className="full__width" to={`/users/${user?.uid}`}>
            <PaperContainer style={paperStyle} elevation={0}>
              <CardContainer>
              {label && <Typography style={{ margin: '1rem 1rem 0 0' }} variant="subtitle1">{label}</Typography>}
                <CardHeader
                style={cardHeaderStyle}
                  avatar={
                    <Avatar src={user?.avatar} alt={user?.firstName}>
                      {user?.firstName?.charAt(0)}
                    </Avatar>
                  }
                  title={`${user?.firstName} ${user?.lastName}`}
                  subheader={user?.serviceYear ? `${translation.joined} ${user?.serviceYear}` : ""}
                  action={
                    <CustomChip
                      size="small"
                      color="primary"
                      variant="outlined"
                      label={translation.roles[user?.role]}
                    />
                  }
                />
              </CardContainer>
            </PaperContainer>
          </Link>
        </ListItem>
      </Grid>
    );
  }
}

export default UserCard
