import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getJobs } from '../../actions'
import JobCard from '../../components/molecules/JobCard'
import CardsSkeletons from '../../components/organisms/CardsSkeletons'
import { Grid, Typography } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import FloatingActionButton from '../../components/atoms/FloatingActionButton'
import JobsFilter from '../../components/organisms/JobsFilter'
import { useHistory } from 'react-router-dom'
import qs from 'query-string'
import PageHeader from '../../components/organisms/PageHeader'
import AddJobDialog from '../../components/layout/AddJobDialog'
import Container from '../../components/atoms/Container'
import PageSection from '../../components/atoms/PageSection'
import JobsList from '../../components/molecules/JobsList'
import JobsFilterProvider from '../../contexts/JobsFilterContext'
import LoadMoreButton from '../../components/atoms/LoadMoreButton'

const Jobs = () => {
  const { translation } = useSelector(state => state.theme)
  const { jobs, isFetching, isFetched, isFetchingMore, isFetchedMore, oldQuery } = useSelector(state => state.jobs)
  const [isAddingJob, setIsAddingJob] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()
  const parsedQuery = qs.parse(history.location.search)

  useEffect(() => {
    if ((isFetching && isFetched) || (parsedQuery !== oldQuery && !isFetching)) {
      dispatch(getJobs(parsedQuery))
    }
  }, [dispatch, history.location.search])

  const handleAddJob = () => setIsAddingJob(true)

  return (
    <JobsFilterProvider>
      <Container>
        <AddJobDialog open={isAddingJob} onClose={() => setIsAddingJob(false)} />
        <FloatingActionButton color='primary' variant='extended' title={translation.addJob} action={handleAddJob}>
          <AddIcon />
        </FloatingActionButton>
        <PageSection>
          <PageHeader backButton title={translation.findJob} backLink='/home' />
        </PageSection>
        <PageSection>
          <JobsFilter />
        </PageSection>
        <PageSection>
          <JobsList loading={isFetching} jobs={jobs} />
          <LoadMoreButton
            loading={isFetchingMore}
            action={getJobs}
            list={jobs}
            query={parsedQuery}
          />
        </PageSection>
      </Container>
    </JobsFilterProvider>
  )
}

export default Jobs
