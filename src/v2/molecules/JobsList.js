import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import JobCard from './JobCard'
import CardsSkeletons from '../organisms/CardsSkeletons'

const JobsList = ({ jobs, loading }) => {
  const { translation } = useSelector(state => state.theme)

  if (loading) {
    return <CardsSkeletons count={1} />
  } else if (!loading && jobs?.length !== 0) {
    return (
      <Grid container spacing={2}>
        {jobs?.map((v, i) => <Grid item key={i} xs={12} md={12} lg={12}><JobCard job={v} /></Grid>)}
      </Grid>
    )
  } else {
    return <Typography className='p-0' variant='body1'>{translation?.couldntFindJobs}</Typography>
  }
}

export default JobsList
