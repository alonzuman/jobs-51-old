import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddIcon from '@material-ui/icons/Add'
import FloatingActionButton from '../../v2/atoms/FloatingActionButton'
import AddActivityDialog from '../../v2/layout/AddActivityDialog'
import ActivityPageStats from './components/ActivityPageStats'
import { getUserActivities } from '../../actions'
import ActivityPageActivitiesList from './components/ActivityPageActivitiesList'
import Container from '../../v2/atoms/Container'
import PageHeader from '../../v2/organisms/PageHeader'
import { Avatar } from '@material-ui/core'
import PageSection from '../../v2/atoms/PageSection'
import AreYouVolunteerDialog from '../../v2/layout/AreYouVolunteerDialog'
import useCurrentUser from '../../hooks/useCurrentUser'
import ActivitiesProgress from '../../v2/molecules/ActivitiesProgress'

const Activity = ({ match }) => {
  const [addingActivity, setAddingActivity] = useState(false)
  const { translation } = useSelector(state => state.theme)
  const { region, loading: authLoading, firstName, avatar } = useSelector(state => state.auth)
  const { activities } = useCurrentUser();
  const { pending, approved } = useSelector(state => state.auth.activities)
  const { isFetching, regionManagers, currentUid, all } = useSelector(state => state.activities.activities)
  const { uid } = match.params
  const handleAddActivity = () => setAddingActivity(true)
  const dispatch = useDispatch()

  useEffect(() => {
    if (currentUid !== uid) {
      dispatch(getUserActivities(uid))
    }
  }, [dispatch, uid])

  const handleAddingActivity = () => setAddingActivity(!addingActivity)

  return (
    <Container>
      <AreYouVolunteerDialog />
      <FloatingActionButton color='primary' action={handleAddActivity} title={translation.addActivity}>
        <AddIcon />
      </FloatingActionButton>
      <AddActivityDialog open={addingActivity} onClose={handleAddingActivity} />
      <PageSection>
        <PageHeader
          loading={authLoading}
          title={translation.activity}
          secondary={<ActivitiesProgress approved={activities.approved} pending={activities.pending}>
            <Avatar className='avatar__md' src={avatar}>{firstName?.charAt(0)}</Avatar>
          </ActivitiesProgress>}
          className='mb-1'
        />
      </PageSection>
      <ActivityPageStats loading={authLoading} pending={pending} approved={approved} region={region} />
      <ActivityPageActivitiesList loading={isFetching} activities={all} region={region} />
    </Container>
  )
}

export default Activity
