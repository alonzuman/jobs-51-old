import { Chip, Divider, Grid, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import React from 'react'
import { useSelector } from 'react-redux'
import PageSection from '../../../v2/atoms/PageSection'
import SubSection from '../../../v2/atoms/SubSection'

const JobPageDetails = ({ loading, job, editing }) => {
  const { translation } = useSelector(state => state.theme)

  if (loading) {
    return <Skeleton width={104} height={32} />
  } else if (editing) {
    return (
      <h1>edit mode</h1>
    )
  } else {
    return (
      <PageSection>
        <Divider />
        <br />
        <Typography variant='h2'>{translation.jobDescription}</Typography>
        <Typography className='mb-1' variant='body1'>{job?.description}</Typography>
        {job?.skills?.length !== 0 &&
        <SubSection>
          <Typography className='mb-25' variant='subtitle1'>{translation.fieldsOfWork}</Typography>
          <Grid container spacing={1}>
            {job?.skills?.map((v, i) => <Grid item key={i}><Chip color='primary' size='small' variant='outlined' label={v} /></Grid>)}
          </Grid>
        </SubSection>}
        {job?.industry &&
        <SubSection>
          <Typography variant='subtitle1'>{translation.industry}</Typography>
          <Typography variant='body1'>{job?.industry}</Typography>
        </SubSection>}
      </PageSection>
    )
  }
}

export default JobPageDetails
