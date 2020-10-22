import React from 'react'
import { Skeleton } from '@material-ui/lab'
import PageHeader from '../../../v2/organisms/PageHeader'
import { Avatar } from '@material-ui/core'
import JobPageHeaderActions from './JobPageHeaderActions'

const JobPageHeader = ({ loading, job }) => {
  if (loading) {
    return (
      <PageHeader
        className='p-1 mt-3'
        title={<Skeleton width={104} />}
        subtitle={<Skeleton width={48} />}
        secondary={<Skeleton variant='circle' height={56} width={56} />}
      />
    )
  } else {
    return (
      <PageHeader
        backButton
        className='p-1'
        title={`${job?.jobTitle}, ${job?.company}`}
        subtitle={job?.location}
        secondary={<Avatar className='avatar__md clickable' src={job?.avatar}>{job?.company?.charAt(0)}</Avatar>}
        action={<JobPageHeaderActions job={job} />}
      />
    )
  }
}

export default JobPageHeader
