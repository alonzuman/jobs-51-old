import React, { useEffect } from 'react'
import Container from '../../v2/atoms/Container'

// Actions
import { useDispatch, useSelector } from 'react-redux'
import { getJob } from '../../actions'

// Sections
import JobPageBadges from './components/JobPageBadges'
import JobPageDetails from './components/JobPageDetails'
import JobPageHeader from './components/JobPageHeader'
import JobPageJobsCarousel from './components/JobPageJobsCarousel'
import JobPageUserDetails from './components/JobPageUserDetails'

const Job = ({ match }) => {
  const dispatch = useDispatch()
  const { loading, job } = useSelector(state => state.jobs)
  const isLoading = loading || !job
  const jid = match.params.jid

  useEffect(() => {
    if (jid !== job?.id) {
      dispatch(getJob(jid))
    }
  }, [])

  return (
    <Container>
      <JobPageHeader loading={isLoading} job={job} />
      {/* <JobPageBadges loading={isLoading} job={job} /> */}
      <JobPageDetails loading={isLoading} job={job} />
      <JobPageUserDetails loading={isLoading} job={job} />
      {/* <JobPageJobsCarousel loading={isLoading} job={job} /> */}
    </Container>
  )
}

export default Job
