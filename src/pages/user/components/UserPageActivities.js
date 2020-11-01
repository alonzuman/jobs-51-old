import { Button, Divider } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import PageSection from '../../../v2/atoms/PageSection'
import PageSectionTitle from '../../../v2/atoms/PageSectionTitle'
import { Link } from 'react-router-dom'
import ActivitiesList from '../../../v2/organisms/ActivitiesList'
import { Skeleton } from '@material-ui/lab'

const UserPageActivities = ({ user, loading, editing }) => {
  const { translation } = useSelector(state => state.theme)

  if (loading) {
    return (
      <PageSection>
        <Skeleton width={128} height={32} />
      </PageSection>
    )
  } else if (editing) {
    return null;
  } else {
    return (
      <>
        <Divider className='mb-2' />
        <PageSection>
          <PageSectionTitle
            title={`${translation.activitiesBy} ${user?.firstName}`}
            subtitle={translation.activitiesByExplanation}
          />
        </PageSection>
        <PageSection>
          <ActivitiesList loading={loading} activities={user?.activitiesList} />
        </PageSection>
      </>
    )
  }
}

export default UserPageActivities
