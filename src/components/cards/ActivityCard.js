import React, { useState } from 'react'
import { ListItem, ListItemText, Box, Typography, Paper, IconButton, Grid, Avatar } from '@material-ui/core'
import { translateDate, activityTypeColor, checkPermissions } from '../../utils'
import { useSelector } from 'react-redux'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ActivityCardActions from './ActivityCardActions';
import CardContainer from './CardContainer';
import CustomChip from './CustomChip';
import { Link } from 'react-router-dom';
import CardMarker from './CardMarker';
import AccessTimeIcon from "@material-ui/icons/AccessTime";

const ActivityCard = ({ activity, showUser = true }) => {
  const [open, setOpen] = useState(false)
  const { theme } = useSelector(state => state.theme)
  const { role } = useSelector(state => state.auth)
  const dateStyle = {
    borderLeft: `1px solid ${theme.palette.border.main}`,
    textAlign: 'center',
    padding: '0 1rem',
    margin: '.5rem 0',
    minWidth: 72
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
      <Grid item xs={12} md={6} lg={6}>
        <ListItem onClick={() => setOpen(!open)} className="br-1" button>
          <CardContainer>
            <Paper className='full__width full__height flex pt-5 pb-5 br-1' elevation={0}>
              <Box style={dateStyle}>
                <CardMarker color={activity.approved ? "#4caf50" : "#e15757"} />
                <Typography variant="subtitle1">{month}</Typography>
                <Typography variant="h2">{number}</Typography>
                <Typography variant="body1">{day}</Typography>
              </Box>
              <Box className='pt-1 pr-1 pb-5 full__width'>
                <CustomChip
                  label={activity.type}
                  size="small"
                  variant="outlined"
                  style={chipStyle}
                />
                <ListItemText
                  primary={activity.description}
                  secondary={<span className='flex align__center'><AccessTimeIcon style={{ height: '.75rem', width: '.75rem', marginLeft: '.25rem', marginBottom: '.1rem' }} />{activity.total}</span>}
                />
              </Box>
              {showUser && (
                <Link to={checkPermissions(role) >= 3 && `/users/${activity.uid}`}>
                  <Box className='flex align__center justify__center flex__column p-1 mw-80' style={{ minWidth: 80 }}>
                    <Avatar src={activity?.user?.avatar} />
                    <Typography style={{ marginTop: '.25rem', textAlign: "center" }} variant="subtitle1" >
                      {activity?.user?.firstName} {activity?.user?.lastName}
                    </Typography>
                  </Box>
                </Link>)}
            </Paper>
            <Box className='flex align__center justify__center'>
              <IconButton className='mb-5' size='small' style={iconStyle} onClick={() => setOpen(!open)}>
                <KeyboardArrowDownIcon />
              </IconButton>
            </Box>
          </CardContainer>
        </ListItem>
        {open && <ActivityCardActions style={{ marginTop: '.5rem' }} activity={activity} />}
      </Grid>
    </>
  );
}

export default ActivityCard
