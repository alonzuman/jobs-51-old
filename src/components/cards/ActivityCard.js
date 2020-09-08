import React, { useState } from 'react'
import { ListItem, ListItemText, Chip, Box, Typography, Paper, IconButton, Grid, Avatar } from '@material-ui/core'
import { translateDate, activityTypeColor, checkPermissions } from '../../utils'
import { useSelector } from 'react-redux'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ActivityCardActions from './ActivityCardActions';
import CardContainer from './CardContainer';
import CustomChip from './CustomChip';
import { Link } from 'react-router-dom';

const ActivityCard = ({ activity, showUser = true }) => {
  const [open, setOpen] = useState(false)
  const { theme } = useSelector(state => state.theme)
  const { role } = useSelector(state => state.auth)
  const paperStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '1rem',
    display: 'flex'
  }

  const dateStyle = {
    borderLeft: `1px solid ${theme.palette.border.main}`,
    textAlign: 'center',
    padding: '0 1rem',
    margin: '1rem 0',
    minWidth: 72
  }

  const detailsStyle = {
    padding: '1rem 1rem 1rem 0',
    width: '100%'
  }

  const actionBoxStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  const userInfoStlye = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '1rem'
  }

  const iconStyle = {
    transform: open ? 'rotate(-180deg)' : 'none',
    transition: '.15s transform ease-in-out'
  }

  const chipStyle = {
    color: activityTypeColor(activity.type),
    border: `1px solid ${activityTypeColor(activity.type)}`
  }

  const [day, month, number] = translateDate(activity.date)
  return (
    <>
    <Grid item xs={12} md={6} lg={4}>
      <ListItem className='br-1' button>
        <CardContainer>
          <Paper style={paperStyle} elevation={0}>
            <Box style={dateStyle}>
              <Typography variant='subtitle1'>{month}</Typography>
              <Typography variant='h2'>{number}</Typography>
              <Typography variant='body1'>{day}</Typography>
            </Box>
            <Box style={detailsStyle}>
              <CustomChip label={activity.type} size='small' variant='outlined' style={chipStyle} />
              <ListItemText
                primary={activity.description}
                secondary={activity.total}
              />
            </Box>
            {showUser &&
            <Link to={checkPermissions(role) >= 3 && `/users/${activity.uid}`}>
              <Box style={userInfoStlye}>
                <Avatar src={activity?.user?.avatar} />
                <Typography style={{ textAlign: 'center' }} variant='subtitle1'>{activity?.user?.firstName} {activity?.user?.lastName}</Typography>
              </Box>
            </Link>}
          </Paper>
          <Box style={actionBoxStyle}>
            <IconButton style={iconStyle} onClick={() => setOpen(!open)}>
              <KeyboardArrowDownIcon />
            </IconButton>
          </Box>
        </CardContainer>
      </ListItem>
      {open && <ActivityCardActions activity={activity} />}
    </Grid>
    </>
  )
}

export default ActivityCard
