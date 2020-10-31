import React from 'react'
import { CardHeader, Avatar, CardActions, Card, Chip } from '@material-ui/core'
import moment from 'moment'
import 'moment/locale/he'
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
  const timeAgo = () => {
    moment.locale('he')
    return moment(job?.dateCreated).fromNow()
  }

  return (
    <Card variant='outlined'>
      <Link to={`/jobs/${job?.id}`}>
        <CardHeader
          avatar={<Avatar src={job?.image} alt={job?.company}>{job?.company[0]?.toUpperCase()}</Avatar>}
          title={job?.jobTitle}
          subheader={`${job?.company}, ${job?.location}`}
        />
        <CardActions className='pt-0'>
          <Chip variant='outlined' size='small' label={timeAgo()} color='primary' />
        </CardActions>
      </Link>
    </Card>
  )
}

export default JobCard
