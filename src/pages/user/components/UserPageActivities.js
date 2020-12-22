import { Button, Divider } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import PageSection from '../../../components/atoms/PageSection'
import PageSectionTitle from '../../../components/atoms/PageSectionTitle'
import { Link } from 'react-router-dom'
import ActivitiesList from '../../../components/organisms/ActivitiesList'
import { Skeleton } from '@material-ui/lab'

const UserPageActivities = ({ user, loading, editing }) => {
  const { translation } = useSelector(state => state.theme)
  const { volunteer } = user;

  if (!volunteer) return null;

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
