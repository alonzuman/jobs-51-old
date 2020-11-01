import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { approveUser, getUser, updateUser } from '../../actions/users'
import UserPageJobInfo from './components/UserPageJobInfo'
import UserPageBio from './components/UserPageBio'
import UserPageBadges from './components/UserPageBadges'
import UserPageJobsCarousel from './components/UserPageJobsCarousel'
import UserPageHeader from './components/UserPageHeader'
import { useHistory } from 'react-router-dom'
import Container from '../../v2/atoms/Container'
import UserPageActivities from './components/UserPageActivities'
import PageSection from '../../v2/atoms/PageSection'
import { Divider } from '@material-ui/core'


const User = ({ match }) => {
  const [imageOpen, setImageOpen] = useState(false)
  const [isDeclining, setIsDeclining] = useState(false)
  const [editing, setEditing] = useState(false)
  const history = useHistory()
  const { loading, user } = useSelector(state => state.users)
  const { theme } = useSelector(state => state.theme)
  const uid = match.params.id
  const dispatch = useDispatch()

  useEffect(() => {
    if (user?.uid !== uid) {
      dispatch(getUser(uid))
    }
  }, [dispatch, uid])

  const handleImageOpen = () => setImageOpen(!imageOpen)
  const handleApproveUser = () => {
    const newUser = {
      uid: user.uid,
      ...user,
      role: 'user'
    }
    dispatch(updateUser(newUser))
  }
  const handleIsDeclining = () => setIsDeclining(!isDeclining)
  const handleEditing = () => {
    history.push({
      pathname: `/users/${uid}/edit`
    })
    setEditing(!editing)
  }

  return (
    <Container>
      <PageSection disableGutters sticky>
        <UserPageHeader
          handleImageOpen={handleImageOpen}
          editing={false}
          handleEditing={handleEditing}
          loading={loading}
          user={user}
        />
        <UserPageBadges
          handleApproveUser={handleApproveUser}
          handleIsDeclining={handleIsDeclining}
          loading={loading}
          user={user}
          editing={false}
        />
      </PageSection>
      <UserPageBio
        editing={false}
        user={user}
        loading={loading}
      />
      <UserPageJobInfo
        editing={false}
        user={user}
        loading={loading}
      />
      <UserPageJobsCarousel
        user={user}
        loading={loading}
        editing={false}
      />
      <UserPageActivities
        user={user}
        loading={loading}
        editing={editing}
      />
    </Container>
  );
}

export default User
