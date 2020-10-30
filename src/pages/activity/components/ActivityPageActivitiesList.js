import { Divider, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import React from 'react'
import { useSelector } from 'react-redux'
import ActivitiesList from '../../../components/lists/ActivitiesList'
import CardsSkeletons from '../../../components/skeletons/CardsSkeletons'
import PageSection from '../../../v2/atoms/PageSection'

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
        <Typography variant='h2'>{translation.latestActivities}</Typography>
        <Typography className='mb-1' variant='subtitle1'>{translation.recentActivitiesInRegion} {region}</Typography>
        <ActivitiesList activities={activities} loading={loading} />
      </PageSection>
    )
  } else {
    return (
      <PageSection>
        <Divider className='mb-2 mt-1' />
        <Typography variant='h2'>{translation.latestActivities}</Typography>
        <Typography className='mt-1' variant='body1'>{translation.activitiesEmptyState}</Typography>
      </PageSection>
    )
  }
}

export default ActivityPageActivitiesList
