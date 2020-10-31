import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import JobCard from './JobCard'
import CardsSkeletons from '../organisms/CardsSkeletons'
import PageSection from '../atoms/PageSection'

const JobsList = ({ jobs, loading }) => {
  const { translation } = useSelector(state => state.theme)

  if (loading) {
    return (
      <PageSection spaceBottom>
        <CardsSkeletons className='p-0' count={1} />
      </PageSection>
    )
  } else if (!loading && jobs?.length !== 0) {
    return (
      <PageSection spaceBottom>
        <Grid container spacing={2}>
          {jobs?.map((v, i) => <Grid item key={i} xs={12} md={6} lg={6}><JobCard job={v} /></Grid>)}
        </Grid>
      </PageSection>
    )
  } else {
    return (
      <PageSection spaceBottom>
        <Typography className='p-0' variant='body1'>{translation?.couldntFindJobs}</Typography>
      </PageSection>
    )
  }
}

export default JobsList
