import { Divider, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import React from 'react'
import { useSelector } from 'react-redux'
import ActivitiesList from '../../../components/lists/ActivitiesList'
import CardsSkeletons from '../../../components/skeletons/CardsSkeletons'
import Container from '../../../v2/atoms/Container'

const ActivityPageActivitiesList = ({ activities, loading, region }) => {
  const { translation } = useSelector(state => state.theme)

  if (loading) {
    return (
      <Container className='pr-0'>
        <Skeleton height={24} width={96} />
        <Skeleton className='mb-1' height={16} width={124} />
        <CardsSkeletons className='p-0' count={1} />
      </Container>
    )
  } else {
    return (
      <Container>
        <Divider className='mb-1' />
        <Typography variant='h2'>{translation.latestActivities}</Typography>
        <Typography className='mb-1' variant='subtitle1'>{translation.recentActivitiesInRegion} {region}</Typography>
        <ActivitiesList activities={activities} loading={loading} />
      </Container>
    )
  }
}

export default ActivityPageActivitiesList
