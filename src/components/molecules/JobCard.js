import React from 'react'
import { Avatar, Chip, ListItem, ListItemAvatar, ListItemText, Divider, ListItemSecondaryAction, Typography } from '@material-ui/core'
import moment from 'moment'
import 'moment/locale/he'
import { Link } from 'react-router-dom';
import IndustryIcons from '../atoms/IndustryIcons';

const JobCard = ({ job }) => {
  const timeAgo = () => {
    moment.locale('he')
    return moment(job?.dateCreated).fromNow()
  }

  return (
    <Link to={`/jobs/${job?.id}`}>
      <ListItem button alignItems='flex-start'>
        <ListItemAvatar>
          <Avatar src={job?.image} alt={job?.company}>{job?.company[0]?.toUpperCase()}</Avatar>
          {/* TODO ALON fix it to the icons */}
          {/* {job?.industry ? <IndustryIcons type={job?.industry} /> : <Avatar src={job?.image} alt={job?.company}>{job?.company[0]?.toUpperCase()}</Avatar>} */}
        </ListItemAvatar>
        <ListItemText
          primary={job?.jobTitle}
          secondary={`${job?.company}${job?.company && job?.location && ','} ${job?.location}`}
        />
        <Chip variant='outlined' color='primary' size='small' label={timeAgo()} />
      </ListItem>
      <Divider />
    </Link>
  )
}

export default JobCard
