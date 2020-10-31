import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getJobs } from '../../actions'
import JobCard from '../../v2/molecules/JobCard'
import CardsSkeletons from '../../v2/organisms/CardsSkeletons'
import { Grid, Typography } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import FloatingActionButton from '../../v2/atoms/FloatingActionButton'
import JobsFilter from '../../v2/organisms/JobsFilter'
import { useHistory } from 'react-router-dom'
import qs from 'query-string'
import PageHeader from '../../v2/organisms/PageHeader'
import AddJobDialog from '../../v2/layout/AddJobDialog'
import Container from '../../v2/atoms/Container'

const Jobs = () => {
  const { translation } = useSelector(state => state.theme)
  const { jobs, loading } = useSelector(state => state.jobs)
  const [isAddingJob, setIsAddingJob] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    const { skills, location, industry, date } = qs.parse(history.location.search)
    let skillsQuery;
    if (typeof skills === 'string') {
      skillsQuery = [skills]
    } else {
      skillsQuery = skills
    }

    let industryQuery;

    if (industry === 'הכל' || '') {
      industryQuery = ''
    } else {
      industryQuery = industry
    }

    let query = { location, skills: skillsQuery, industry: industryQuery, date }
    dispatch(getJobs(query))
  }, [dispatch, history.location.search])

  const handleAddJob = () => setIsAddingJob(true)

  return (
    <Container>
      <AddJobDialog open={isAddingJob} onClose={() => setIsAddingJob(false)} />
      <FloatingActionButton color='primary' variant='extended' title={translation.addJob} action={handleAddJob}>
        <AddIcon />
      </FloatingActionButton>
      <PageHeader backButton title={translation.findJob} />
      <JobsFilter />
      {loading && <CardsSkeletons className='p-0' />}
      <Grid className='mb-4' container spacing={2}>
        {(jobs?.length === 0 && !loading) && <Typography className='mt-1' color='textPrimary' variant='body1'>{translation?.couldntFindJobs}</Typography>}
        {!loading && jobs?.map((job, index) => <Grid key={index} item xs={12} md={6} lg={6}><JobCard loading={loading} job={job} /></Grid>)}
      </Grid>
    </Container>
  )
}

export default Jobs
