import { Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserActivities } from '../../../actions/activities'
import { getUser } from '../../../actions/users'
import ActivitiesList from '../../../components/lists/ActivitiesList'
import CardsSkeletons from '../../../components/skeletons/CardsSkeletons'
import Container from '../../../v2/atoms/Container'
import PageSection from '../../../v2/atoms/PageSection'
import PageHeader from '../../../v2/organisms/PageHeader'

const UserActivities = ({ match }) => {
  const { id: uid } = match.params;
  const { user, loading: userLoading } = useSelector(state => state.users);
  const { translation } = useSelector(state => state.theme);
  const { activities, loading } = useSelector(state => state.activities);
  const dispatch = useDispatch()

  useEffect(() => {
    if (!user.firstName) {
      dispatch(getUser(uid))
    }
    dispatch(getUserActivities(uid))
  }, [])

  if (loading || userLoading) {
    return (
      <Container>
        <PageSection className='p-1 pb-0'>
          <PageHeader title={<Skeleton height={32} width={104} />} />
        </PageSection>
        <PageSection>
          <CardsSkeletons className='p-0' count={1} />
        </PageSection>
      </Container>
    )
  } else if (!loading && !userLoading && activities?.length !== 0) {
    return (
      <Container>
        <PageSection className='p-1 pb-0'>
          <PageHeader titleVariant='h2' title={`${translation.userActivitiesTitle} ${user.firstName}`} backButton />
        </PageSection>
        <PageSection >
          <ActivitiesList activities={activities} loading={loading} />
        </PageSection>
      </Container>
    )
  } else {
    return (
      <Container>
        <PageSection className='p-1 pb-0'>
          <PageHeader titleVariant='h2' title={`${translation.userActivitiesTitle} ${user.firstName}`} backButton />
        </PageSection>
        <PageSection>
          <Typography variant='body1'>{translation.noDataToShow}</Typography>
        </PageSection>
      </Container>
    )
  }
}

export default UserActivities
