import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddIcon from '@material-ui/icons/Add'
import FloatingActionButton from '../../v2/atoms/FloatingActionButton'
import AddActivityDialog from '../../v2/layout/AddActivityDialog'
import ActivityPageRegionAdmins from './components/ActivityPageRegionAdmins'
import ActivityPageStats from './components/ActivityPageStats'
import { getRegionManagers, getUserActivities } from '../../actions'
import ActivityPageActivitiesList from './components/ActivityPageActivitiesList'
import Container from '../../v2/atoms/Container'
import AddRegionDialog from '../../v2/layout/AddRegionDialog'
import { auth } from '../../firebase'
import PageHeader from '../../v2/organisms/PageHeader'
import { Link } from 'react-router-dom'
import NotificationIcon from '../../v2/molecules/NotificationIcon'
import { IconButton } from '@material-ui/core'
import PageSection from '../../v2/atoms/PageSection'

const Activity = ({ match }) => {
  const [editingProfile, setEditingProfile] = useState(false)
  const [addingActivity, setAddingActivity] = useState(false)
  const { translation } = useSelector(state => state.theme)
  const { region, loading: authLoading } = useSelector(state => state.auth)
  const { pending, approved } = useSelector(state => state.auth.activities)
  const { activities, regionManagers, loading: activitiesLoading } = useSelector(state => state.activities)
  const { uid } = match.params
  const handleAddActivity = () => setAddingActivity(true)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserActivities(uid))
    if (region) {
      dispatch(getRegionManagers(region))
    }
  }, [dispatch, uid])

  useEffect(() => {
    if (!activitiesLoading && !region && uid === auth.currentUser.uid) {
      setEditingProfile(true)
    }
  }, [activitiesLoading])

  const handleAddingActivity = () => setAddingActivity(!addingActivity)
  const handleEditingProfile = () => setEditingProfile(!editingProfile)

  return (
    <Container>
      <AddRegionDialog isOpen={editingProfile} onClose={handleEditingProfile} />
      <FloatingActionButton color='primary' action={handleAddActivity} title={translation.addActivity}>
        <AddIcon />
      </FloatingActionButton>
      <AddActivityDialog open={addingActivity} onClose={handleAddingActivity} />
      <PageSection>
        <PageHeader
          loading={authLoading}
          title={translation.activity}
          secondary={<Link to={`/${uid}/notifications`}><IconButton size='small'><NotificationIcon /></IconButton></Link>}
          className='mb-1'
        />
      </PageSection>
      <ActivityPageStats loading={authLoading} pending={pending} approved={approved} region={region} />
      <ActivityPageRegionAdmins regionManagers={regionManagers} loading={activitiesLoading} region={region} />
      <ActivityPageActivitiesList loading={activitiesLoading} activities={activities} region={region} />
    </Container>
  )
}

export default Activity
