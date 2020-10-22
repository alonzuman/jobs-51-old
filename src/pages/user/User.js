import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { approveUser, getUser } from '../../actions/users'
import UserPageJobInfo from './components/UserPageJobInfo'
import UserPageBio from './components/UserPageBio'
import UserPageBadges from './components/UserPageBadges'
import UserPageJobsCarousel from './components/UserPageJobsCarousel'
import UserPageHeader from './components/UserPageHeader'
import { useHistory } from 'react-router-dom'
import UserPageActivitiesCarousel from './components/UserPageActivitiesCarousel'
import Container from '../../v2/atoms/Container'

const User = ({ match }) => {
  const [imageOpen, setImageOpen] = useState(false)
  const [isDeclining, setIsDeclining] = useState(false)
  const [editing, setEditing] = useState(false)
  const history = useHistory()
  const { loading, user } = useSelector(state => state.users)
  const uid = match.params.id
  const dispatch = useDispatch()

  useEffect(() => {
    if (user?.uid !== uid) {
      dispatch(getUser(uid))
    }
  }, [dispatch, uid])

  const handleImageOpen = () => setImageOpen(!imageOpen)
  const handleApproveUser = () => dispatch(approveUser(uid))
  const handleIsDeclining = () => setIsDeclining(!isDeclining)
  const handleEditing = () => {
    history.push({
      pathname: `/users/${uid}/edit`
    })
    setEditing(!editing)
  }

  return (
    <Container>
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
      <UserPageActivitiesCarousel
        user={user}
        loading={loading}
        editing={editing}
      />
      <UserPageJobsCarousel
        user={user}
        loading={loading}
        editing={false}
      />
    </Container>
  );
}

export default User
