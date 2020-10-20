import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getJobs } from '../actions'
import JobCard from '../components/cards/JobCard'
import CardsSkeletons from '../components/skeletons/CardsSkeletons'
import { Grid, Typography } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import FloatingActionButton from '../components/layout/FloatingActionButton'
import PageContainer from '../components/layout/PageContainer'
import JobsFilter from '../components/filters/JobsFilter'
import { useHistory } from 'react-router-dom'
import qs from 'query-string'
import PageHeader from '../v2/organisms/PageHeader'
import AddJobDialog from '../v2/layout/AddJobDialog'

const Jobs = () => {
  const { translation } = useSelector(state => state.theme)
  const { jobs, loading } = useSelector(state => state.jobs)
  const [isAddingJob, setIsAddingJob] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    const { skills, location } = qs.parse(history.location.search)
    let skillsQuery;
    if (typeof skills === 'string') {
      skillsQuery = [skills]
    } else {
      skillsQuery = skills
    }

    let query = { location, skills: skillsQuery }
    dispatch(getJobs(query))
  }, [dispatch, history.location.search])

  const handleAddJob = () => setIsAddingJob(true)

  return (
    <PageContainer>
      <AddJobDialog open={isAddingJob} onClose={() => setIsAddingJob(false)} />
      <FloatingActionButton color='primary' variant='extended' title={translation.addJob} action={handleAddJob}>
        <AddIcon />
      </FloatingActionButton>
      <PageHeader backButton title={translation.findJob} />
      <JobsFilter />
      {loading && <CardsSkeletons />}
      <Grid className='cards__container' container spacing={2}>
        {(jobs?.length === 0 && !loading) && <Typography className='mt-1' color='textPrimary' variant='body1'>{translation?.couldntFindJobs}</Typography>}
        {!loading && jobs?.map((job, index) => <JobCard key={index} job={job} />)}
      </Grid>
    </PageContainer>
  )
}

export default Jobs
