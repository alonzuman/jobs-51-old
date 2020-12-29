import React, { useEffect } from 'react'
import Container from '../../components/atoms/Container'

// Actions
import { useDispatch, useSelector } from 'react-redux'
import { getJob } from '../../actions'

// Sections
import JobPageDetails from './components/JobPageDetails'
import JobPageHeader from './components/JobPageHeader'
import JobPageJobsCarousel from './components/JobPageJobsCarousel'
import JobPageUserDetails from './components/JobPageUserDetails'
import { useHistory } from 'react-router-dom'
import JobPageImages from './components/JobPageImages'
import JobPageCallToAction from './components/JobPageCallToAction'
// import JobActions from './components/JobActions'

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
    if (jid !== job?.id && jid) {
      dispatch(getJob(jid))
    }
  }, [jid])

  const subtitle = (
    <>
      {job?.company}{job?.company && job?.location && ','} {job?.location}
    </>
  )

  return (
    <Container>
      <JobPageHeader
        handleEditing={handleEditing}
        loading={isLoading}
        job={job}
        title={job?.jobTitle}
        image={job?.image}
        subtitle={subtitle}
      />
      <JobPageDetails loading={isLoading} job={job} />
      <JobPageImages images={job?.images} />
      {/* <JobActions editing={false} job={job} loading={isLoading} /> */}
      <JobPageCallToAction loading={isLoading} job={job} />
      <JobPageUserDetails loading={isLoading} job={job} />
      <JobPageJobsCarousel loading={isLoading} jobs={job?.similarJobs?.filter(v => v.id !== jid)} />
    </Container>
  )
}

export default Job
