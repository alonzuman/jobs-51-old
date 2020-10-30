import { Divider, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import React from 'react'
import { useSelector } from 'react-redux'
import ActivitiesList from '../../../components/lists/ActivitiesList'
import CardsSkeletons from '../../../components/skeletons/CardsSkeletons'
import PageSection from '../../../v2/atoms/PageSection'
import PageSectionTitle from '../../../v2/atoms/PageSectionTitle'

const ActivityPageActivitiesList = ({ activities, loading, region }) => {
  const { translation } = useSelector(state => state.theme)

  if (loading) {
    return (
      <PageSection>
        <Skeleton height={24} width={96} />
        <Skeleton className='mb-1' height={16} width={124} />
        <CardsSkeletons className='p-0' count={1} />
      </PageSection>
    )
  } else if (activities?.length !== 0) {
    return (
      <PageSection>
        <Divider className='mb-2 mt-1' />
        <PageSectionTitle
          title={translation.latestActivities}
          subtitle={`${translation.recentActivitiesInRegion} ${region}`}
          className='mb-1'
        />
        <ActivitiesList activities={activities} loading={loading} />
      </PageSection>
    )
  } else {
    return (
      <PageSection>
        <Divider className='mb-2 mt-1' />
        <PageSectionTitle
          title={translation.latestActivities}
          subtitle={translation.activitiesEmptyState}
        />
      </PageSection>
    )
  }
}

export default ActivityPageActivitiesList
