import { Grid, List, Typography } from '@material-ui/core'
import React from 'react'
import JobCard from './JobCard'
import CardsSkeletons from '../organisms/CardsSkeletons'
import useTheme from '../../hooks/useTheme'

const JobsList = ({ jobs, loading }) => {
  const { translation } = useTheme()

  if (loading) {
    return <CardsSkeletons disableGutters count={1} />
  } else if (!loading && jobs?.length !== 0) {
    return (
      <List>
        {jobs?.map(job => <JobCard key={job.id} job={job} />)}
      </List>
    )
  } else {
    return <Typography className='p-0' variant='body1'>{translation?.couldntFindJobs}</Typography>
  }
}

export default JobsList
