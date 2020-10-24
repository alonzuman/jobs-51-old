import { Grid } from '@material-ui/core'
import React from 'react'
import JobCard from '../../components/cards/JobCard'
import CardsSkeletons from '../../components/skeletons/CardsSkeletons'
import PageSection from '../atoms/PageSection'

const JobsList = ({ jobs, loading }) => {

  if (loading) {
    return (
      <PageSection>
        <CardsSkeletons count={1} />
      </PageSection>
    )
  }
  return (
    <PageSection>
      <Grid container spacing={2}>
        {jobs?.map((v, i) => <Grid item key={i} xs={12} md={6} lg={6}><JobCard job={v} /></Grid>)}
      </Grid>
    </PageSection>
  )
}

export default JobsList
