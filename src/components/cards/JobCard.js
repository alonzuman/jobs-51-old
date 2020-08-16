import React from 'react'
import { Card, CardHeader, IconButton, Grid, CardContent, Typography, Avatar, Chip } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { removeJob, openEditingJob, setJob } from '../../actions'
import EditIcon from '@material-ui/icons/Edit';

const JobCard = ({ job }) => {
  const dispatch = useDispatch()
  const { translation, direction } = useSelector(state => state.theme)

  const handleClick = () => {
    dispatch(openEditingJob())
    dispatch(setJob(job))
  }

  // console.log(job)

  return (
    <Grid item xs={12} md={6} lg={4}>
      <Card style={{ direction }}>
        <CardHeader
          avatar={<Avatar src={job?.image} alt={job?.company}>{job?.company[0].toUpperCase()}</Avatar>}
          title={job?.company}
          subheader={job?.location}
          action={<IconButton onClick={handleClick}><EditIcon /></IconButton>} />
        <CardContent>
          <Typography variant='body1'>{translation.type}</Typography>
          <Typography variant='body1'>{job?.type}</Typography>
          <Typography variant='body1'>{translation.description}</Typography>
          <Typography variant='body1'>{job?.description}</Typography>
          <Typography variant='body1'>{translation.requirements}</Typography>
          <Grid container spacing={1}>
            {job?.requirements?.map((req, index) => <Grid item key={index}><Chip label={req} /></Grid>)}
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default JobCard
