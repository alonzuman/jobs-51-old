import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddIcon from '@material-ui/icons/Add'
import FloatingActionButton from '../../components/atoms/FloatingActionButton'
import AddActivityDialog from '../../components/layout/AddActivityDialog'
import ActivityPageStats from './components/ActivityPageStats'
import { getUserActivities } from '../../actions'
import ActivityPageActivitiesList from './components/ActivityPageActivitiesList'
import Container from '../../components/atoms/Container'
import PageHeader from '../../components/organisms/PageHeader'
import PageSection from '../../components/atoms/PageSection'
import AreYouVolunteerDialog from '../../components/layout/AreYouVolunteerDialog'
import useCurrentUser from '../../hooks/useCurrentUser'
import ActivityPageAvatar from './components/ActivityPageAvatar'

const Activity = ({ match }) => {
  const [addingActivity, setAddingActivity] = useState(false)
  const { translation } = useSelector(state => state.theme)
  const { region, loading: authLoading, firstName, avatar } = useCurrentUser()
  const { activities } = useCurrentUser();
  const { pending, approved } = useSelector(state => state.auth.activities)
  const { isFetching, currentUid, all } = useSelector(state => state.activities.activities)
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
          secondary={<ActivityPageAvatar />}
          className='mb-1'
        />
      </PageSection>
      <ActivityPageStats loading={authLoading} pending={pending} approved={approved} region={region} />
      <ActivityPageActivitiesList loading={isFetching} activities={all} region={region} />
    </Container>
  )
}

export default Activity
