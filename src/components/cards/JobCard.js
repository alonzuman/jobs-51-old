import React from 'react'
import { Card, CardHeader, IconButton } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { removeJob, openEditingJob, setJob } from '../../actions'
import EditIcon from '@material-ui/icons/Edit';

const JobCard = ({ job }) => {
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(openEditingJob())
    dispatch(setJob(job))
  }

  console.log(job)

  return (
    <Card>
      <CardHeader
        title={job?.company}
        subheader={job?.location}
        action={<IconButton onClick={handleClick}><EditIcon /></IconButton>} />
    </Card>
  )
}

export default JobCard
