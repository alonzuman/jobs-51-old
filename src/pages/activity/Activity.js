import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddIcon from '@material-ui/icons/Add'
import FloatingActionButton from '../../components/layout/FloatingActionButton'
import AddActivityDialog from '../../v2/layout/AddActivityDialog'
import ActivityPageRegionAdmins from './components/ActivityPageRegionAdmins'
import ActivityPageStats from './components/ActivityPageStats'
import { getUserActivities } from '../../actions'
import ActivityPageActivitiesList from './components/ActivityPageActivitiesList'
import Container from '../../v2/atoms/Container'
import AddRegionDialog from '../../v2/layout/AddRegionDialog'
import { auth } from '../../firebase'
import PageHeader from '../../v2/organisms/PageHeader'
import { Link } from 'react-router-dom'
import NotificationIcon from '../../v2/molecules/NotificationIcon'
import { IconButton } from '@material-ui/core'

const Activity = ({ match }) => {
  const [editingProfile, setEditingProfile] = useState(false)
  const [addingActivity, setAddingActivity] = useState(false)
  const { translation } = useSelector(state => state.theme)
  const { region } = useSelector(state => state.auth)
  const { pending, approved } = useSelector(state => state.auth.activities)
  const { activities, regionManagers, loading, currentUid } = useSelector(state => state.activities)
  const { uid } = match.params
  const handleAddActivity = () => setAddingActivity(true)
  const dispatch = useDispatch()

  useEffect(() => {
    if (uid !== currentUid) {
      dispatch(getUserActivities(uid))
    }
  }, [dispatch, uid])

  useEffect(() => {
    if (!loading && !region && uid === auth.currentUser.uid) {
      setEditingProfile(true)
    }
  }, [loading])

  const handleAddingActivity = () => setAddingActivity(!addingActivity)
  const handleEditingProfile = () => setEditingProfile(!editingProfile)

  return (
    <Container>
      <AddRegionDialog isOpen={editingProfile} onClose={handleEditingProfile} />
      <FloatingActionButton color='primary' action={handleAddActivity} title={translation.addActivity}>
        <AddIcon />
      </FloatingActionButton>
      <AddActivityDialog open={addingActivity} onClose={handleAddingActivity} />
      <PageHeader
        className='p-1'
        loading={loading}
        title={translation.activity}
        titleClassName='mt-0'
        secondary={<Link to={`/${uid}/notifications`}><IconButton size='small'><NotificationIcon /></IconButton></Link>}
      />
      <ActivityPageStats loading={loading} pending={pending} approved={approved} region={region} />
      <ActivityPageRegionAdmins regionManagers={regionManagers} loading={loading} region={region} />
      <ActivityPageActivitiesList loading={loading} activities={activities} region={region} />
    </Container>
  )
}

export default Activity
