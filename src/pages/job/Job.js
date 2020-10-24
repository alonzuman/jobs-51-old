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
import { useHistory } from 'react-router-dom'
import JobActions from './components/JobActions'

const Job = ({ match }) => {
  const dispatch = useDispatch()
  const { loading, job } = useSelector(state => state.jobs)
  const isLoading = loading || !job
  const jid = match.params.jid
  const history = useHistory()

  const handleEditing = () => history.push({
    pathname: `/jobs/${jid}/edit`
  })

  useEffect(() => {
    if (jid !== job?.id) {
      dispatch(getJob(jid))
    }
  }, [jid])

  return (
    <Container>
      <JobPageHeader
        handleEditing={handleEditing}
        loading={isLoading}
        job={job}
        title={job?.jobTitle}
        subtitle={`${job?.company}, ${job?.location}`}
      />
      {/* <JobPageBadges loading={isLoading} job={job} /> */}
      <JobPageDetails loading={isLoading} job={job} />
      <JobActions editing={false} job={job} loading={isLoading} />
      <JobPageUserDetails loading={isLoading} job={job} />
      <JobPageJobsCarousel loading={isLoading} jobs={job?.similarJobs?.filter(v => v.id !== jid)} />
    </Container>
  )
}

export default Job
