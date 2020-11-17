import React from 'react'
import { Avatar, Chip, ListItem, ListItemAvatar, ListItemText, Divider, ListItemSecondaryAction } from '@material-ui/core'
import moment from 'moment'
import 'moment/locale/he'
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
  const timeAgo = () => {
    moment.locale('he')
    return moment(job?.dateCreated).fromNow()
  }

  const secondaryText = (
    <>
    {job?.company} {job?.company && job?.location && ','} {job?.location}
    </>
  )

  return (
    <Link to={`/jobs/${job?.id}`}>
      <ListItem button alignItems='flex-start'>
        <ListItemAvatar>
          <Avatar src={job?.image} alt={job?.company}>{job?.company[0]?.toUpperCase()}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={job?.jobTitle}
          secondary={secondaryText}
        />
        <ListItemSecondaryAction>
          <Chip variant='outlined' color='primary' size='small' label={timeAgo()} />
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </Link>
  )
}

export default JobCard
