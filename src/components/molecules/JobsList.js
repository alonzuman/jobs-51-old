import { List } from '@material-ui/core'
import React from 'react'
import JobCard from './JobCard'
import CardsSkeletons from '../organisms/CardsSkeletons'
import SavedEmptyState from '../emptyStates/SavedEmptyState'
import JobsEmptyState from '../emptyStates/JobsEmptyState'

const JobsList = ({ type = 'general',  jobs, isFetching, isFetched }) => {
  if (isFetching) return <CardsSkeletons disableGutters count={1} />
  if (isFetched && jobs?.length !== 0) {
    return (
      <List>
        {jobs?.map(job => <JobCard key={job.id} job={job} />)}
      </List>
    )
  }

  if (isFetched && !isFetching && jobs?.length === 0) {
    switch (type) {
      case 'saved': return <SavedEmptyState />
      default: return <JobsEmptyState />
    }
  }

  return null;
}

export default JobsList
