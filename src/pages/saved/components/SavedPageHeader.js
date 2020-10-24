import React from 'react'
import { useSelector } from 'react-redux'
import PageSection from '../../../v2/atoms/PageSection'
import PageHeader from '../../../v2/organisms/PageHeader'

const SavedPageHeader = ({ loading }) => {
  const { translation } = useSelector(state => state.theme)

  return (
    <PageSection>
      <PageHeader title={translation.savedJobs} loading={loading} />
    </PageSection>
  )
}

export default SavedPageHeader
