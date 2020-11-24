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
import PageHeaderActionsBar from '../../v2/organisms/PageHeaderActionsBar'
import { checkPermissions } from '../../utils'
import { IconButton } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import useScrollPosition from '../../hooks/useScrollPosition'
import useTheme from '../../hooks/useTheme'
import useCurrentUser from '../../hooks/useCurrentUser'


const User = ({ match }) => {
  const [imageOpen, setImageOpen] = useState(false)
  const [isDeclining, setIsDeclining] = useState(false)
  const [editing, setEditing] = useState(false)
  const history = useHistory()
  const { role } = useCurrentUser()
  const { user } = useSelector(state => state.users)
  const { isFetched, isFetching } = user;
  const { theme } = useTheme();
  const { isScrolling } = useScrollPosition()
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

  const canEdit = (checkPermissions(role) >= checkPermissions(user?.role) && checkPermissions(user?.role) !== 0)


  const iconButtonStyle = {
    backgroundColor: isScrolling ? theme?.palette?.background?.light : theme?.palette?.background?.main,
    boxShadow: isScrolling ? '0px 4px 10px #00000015' : '',
    transition: 'box-shadow .25s ease-in-out, background-color .25s ease-in-out',
    height: 32,
    width: 32
  }

  const secondaryActions = (
    canEdit && <IconButton style={iconButtonStyle} size='small' onClick={handleEditing}>{editing ? <CloseIcon /> : <EditIcon fontSize='inherit' />}</IconButton>
  )

  return (
    <Container>
      <PageHeaderActionsBar
        backButton
        isScrolling={isScrolling}
        secondaryActions={secondaryActions}
      />
      <UserPageHeader
        handleImageOpen={handleImageOpen}
        editing={false}
        handleEditing={handleEditing}
        loading={isFetching}
        user={user}
      />
      <UserPageBadges
        handleApproveUser={handleApproveUser}
        handleIsDeclining={handleIsDeclining}
        loading={isFetching}
        user={user}
        editing={false}
      />
      <UserPageBio
        editing={false}
        user={user}
        loading={isFetching}
      />
      <UserPageJobInfo
        editing={false}
        user={user}
        loading={isFetching}
      />
      <UserPageJobsCarousel
        user={user}
        loading={isFetching}
        editing={false}
      />
      <UserPageActivities
        user={user}
        loading={isFetching}
        editing={editing}
      />
    </Container>
  );
}

export default User
