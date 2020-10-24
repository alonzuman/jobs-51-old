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
import ActivityPageHeader from './components/ActivityPageHeader'

const Activity = () => {
  const [addingActivity, setAddingActivity] = useState(false)
  const { translation } = useSelector(state => state.theme)
  const { region, uid } = useSelector(state => state.auth)
  const { pending, approved } = useSelector(state => state.auth.activities)
  const { activities, regionManagers, loading } = useSelector(state => state.activities)
  const handleAddActivity = () => setAddingActivity(true)
  const dispatch = useDispatch()

  useEffect(() => {
    if (region) {
      dispatch(getUserActivities({ uid, region }))
    }
  }, [dispatch])

  const handleAddingActivity = () => setAddingActivity(!addingActivity)

  return (
    <Container>
      <FloatingActionButton color='primary' action={handleAddActivity} title={translation.addActivity}>
        <AddIcon />
      </FloatingActionButton>
      <AddActivityDialog open={addingActivity} onClose={handleAddingActivity} />
      <ActivityPageHeader loading={loading} />
      <ActivityPageStats loading={loading} pending={pending} approved={approved} region={region} />
      <ActivityPageRegionAdmins regionManagers={regionManagers} loading={loading} region={region} />
      <ActivityPageActivitiesList loading={loading} activities={activities} region={region} />
    </Container>
  )
}

export default Activity
