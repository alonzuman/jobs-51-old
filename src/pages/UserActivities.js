import React, { useEffect } from 'react'
import TopBar from '../components/layout/TopBar'
import ActivitiesList from '../components/lists/ActivitiesList'
import { useSelector, useDispatch } from 'react-redux'
import { Skeleton } from '@material-ui/lab'
import { getUserAndActivities } from '../actions/users'
import PageContainer from '../components/layout/PageContainer'
import { Avatar } from '@material-ui/core'

const UserActivities = ({ match }) => {
  const { translation } = useSelector(state => state.theme)
  const { loading, user } = useSelector(state => state.users)
  const uid = match.url.split('/')[2]
  const dispatch = useDispatch()

  useEffect(() => { dispatch(getUserAndActivities(uid)) }, [])

  return (
    <>
      <TopBar
        sticky={true}
        backButton={true}
        title={!loading ? `${user?.firstName} ${user?.lastName}` : <Skeleton width={180} />}
        subtitle={!loading ? user.serviceYear ? `${translation.serviceYear} ${user?.serviceYear}` : '' : <Skeleton width={100} />}
      >
      {!loading ? <Avatar style={{ cursor: 'pointer' }} className='avatar__md' src={user?.avatar} alt={user?.firstName}>{user?.firstName?.charAt(0)}</Avatar> : <Skeleton variant='circle' className='avatar__md' />}
      </TopBar>
      <PageContainer>
        <ActivitiesList />
      </PageContainer>
    </>
  )
}

export default UserActivities
