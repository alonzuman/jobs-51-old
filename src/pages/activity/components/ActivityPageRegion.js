import React from 'react'
import { Link } from 'react-router-dom'
import PageSection from '../../../components/atoms/PageSection'
import ActivityPageRegionAdmins from './ActivityPageRegionAdmins'

const ActivityPageRegion = ({ region, regionManagers, activitiesLoading }) => {

  return (
    <PageSection disableGutters>
      {/* TODO add latest region news */}
      <ActivityPageRegionAdmins regionManagers={regionManagers} loading={activitiesLoading} region={region} />
    </PageSection>
  )
}

export default ActivityPageRegion
