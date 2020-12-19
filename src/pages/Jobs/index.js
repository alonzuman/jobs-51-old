import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getJobs } from '../../actions'
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
  const { jobs, isFetching, isFetched, isFetchingMore, oldQuery } = useSelector(state => state.jobs)
  const [isAddingJob, setIsAddingJob] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()
  const parsedQuery = qs.parse(history.location.search)

  useEffect(() => {
    if ((isFetching && isFetched) || (parsedQuery !== oldQuery && !isFetching)) {
      dispatch(getJobs(parsedQuery))
    }
  }, [dispatch, history.location.search])

  return (
    <JobsFilterProvider>
      <Container>
        <AddJobDialog open={isAddingJob} onClose={() => setIsAddingJob(false)} />
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
