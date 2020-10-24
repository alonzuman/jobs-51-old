import React from 'react'
import { useSelector } from 'react-redux'
import { Grid, Typography } from '@material-ui/core'
import JobCard from '../components/cards/JobCard'
import PageHeader from '../v2/organisms/PageHeader'
import Container from '../v2/atoms/Container'
import PageSection from '../v2/atoms/PageSection'

const SavedJobs = () => {
  const { loading, saved } = useSelector(state => state.auth)
  const { translation } = useSelector(state => state.theme)

  if (loading) {
    return null;
  } else if (!loading && saved?.length !== 0) {
    return (
      <Container>
        <PageHeader spaceTop title={translation.savedJobs} spaceBottom />
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
