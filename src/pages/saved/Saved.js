import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSavedJobs } from '../../actions'
import Container from '../../v2/atoms/Container'
import JobsList from '../../v2/molecules/JobsList'
import SavedPageHeader from './components/SavedPageHeader'

const Saved = ({ match }) => {
  const { uid } = match.params
  const { loading, jobs, currentUid } = useSelector(state => state.saved)
  const dispatch = useDispatch()

  useEffect(() => {
    if (uid !== currentUid) {
      dispatch(getSavedJobs(uid))
    }
  }, [])

  return (
    <Container>
      <SavedPageHeader loading={loading} />
      <JobsList loading={loading} jobs={jobs} />
    </Container>
  )
}

export default Saved
