import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSavedJobs } from '../actions'
import CardsSkeletons from '../components/skeletons/CardsSkeletons'
import { CircularProgress, Grid, Typography } from '@material-ui/core'
import JobCard from '../components/cards/JobCard'
import PageHeader from '../v2/organisms/PageHeader'
import Container from '../v2/atoms/Container'
import PageSection from '../v2/atoms/PageSection'

const SavedJobs = () => {
  const { loading, saved } = useSelector(state => state.auth)
  const { translation } = useSelector(state => state.theme)
  const dispatch = useDispatch()

  if (loading) {
    return null;
  } else if (!loading && saved?.length !== 0) {
    return (
      <Container>
        <PageSection>
          <PageHeader spaceTop title={translation.savedJobs} spaceBottom />
        </PageSection>
        <Grid container spacing={2}>
          {saved?.map((job, index) => <Grid item xs={12} md={6} lg={6}><JobCard key={index} job={job} /></Grid>)}
        </Grid>
      </Container>
    )
  } else {
    return (
      <Container>
        <PageSection>
          <PageHeader spaceTop title={translation.savedJobs} spaceBottom />
          <Typography variant='body1'>{translation.couldntFindSavedJobs}</Typography>
        </PageSection>
      </Container>
    )
  }
}

export default SavedJobs
