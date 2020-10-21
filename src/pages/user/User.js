import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { approveUser, deleteUser, getUser, unapproveUser, updateUser } from '../../actions/users'
import ImageLightbox from '../../components/general/ImageLightbox'

import UserPageJobInfo from './components/UserPageJobInfo'
import UserPageBio from './components/UserPageBio'
import UserPageBadges from './components/UserPageBadges'
import UserPageJobsCarousel from './components/UserPageJobsCarousel'
import styled from 'styled-components'
import UserPageHeader from './components/UserPageHeader'
import ApprovalDialog from '../../v2/layout/ApprovalDialog'
import { useHistory } from 'react-router-dom'
import UserPageActions from './components/UserPageActions'

const Container = styled.div`
  padding: 16px 0;
  max-width: 768px;
  margin: 0 auto;
`

const User = ({ match }) => {
  const [imageOpen, setImageOpen] = useState(false)
  const [isDeclining, setIsDeclining] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [editing, setEditing] = useState(false)
  const { translation } = useSelector(state => state.theme)
  const history = useHistory()
  const { loading, user, isUpdating } = useSelector(state => state.users)
  const uid = match.params.id
  const dispatch = useDispatch()

  // User fields for update
  const [isLookingForJob, setIsLookingForJob] = useState(null)
  const [isVolunteer, setIsVolunteer] = useState(null)
  const [phone, setPhone] = useState('')
  const [about, setAbout] = useState('')
  const [hometown, setHometown] = useState('')
  const [lastPosition, setLastPosition] = useState('')
  const [skills, setSkills] = useState([])

  const handleSubmit = async () => {
    const updatedUser = {
      ...user,
      uid,
      lookingForJob: isLookingForJob,
      volunteer: isVolunteer,
      about,
      phone,
      lastPosition,
      skills,
      hometown
    }
    await dispatch(updateUser(updatedUser))
    await setEditing(false)
  }

  const handleDelete = async () => {
    await dispatch(deleteUser(uid))
    history.goBack()
  }

  useEffect(() => {
    setIsLookingForJob(!!user?.lookingForJob)
    setIsVolunteer(!!user?.volunteer)
    setAbout(user?.about || '')
    setPhone(user?.phone || '')
    setHometown(user?.hometown || '')
    setLastPosition(user?.lastPosition || '')
    setSkills(user?.skills || [])
  }, [user])

  useEffect(() => {
    if (user?.uid !== uid) {
      dispatch(getUser(uid))
    }
  }, [dispatch, uid])

  const handleImageOpen = () => setImageOpen(!imageOpen)
  const handleApproveUser = () => dispatch(approveUser(uid))
  const handleIsDeclining = () => setIsDeclining(!isDeclining)
  const handleIsDeleting = () => setIsDeleting(!isDeleting)
  const handleEditing = () => setEditing(!editing)
  const handleUnapproveUser = async () => {
    await dispatch(unapproveUser(uid))
    history.goBack()
  }

  return (
    <Container>
      <UserPageHeader
        handleImageOpen={handleImageOpen}
        editing={editing}
        handleEditing={handleEditing}
        loading={loading}
        user={user}
        handleSubmit={handleSubmit}
      />
      <UserPageBadges
        isLookingForJob={isLookingForJob}
        setIsLookingForJob={setIsLookingForJob}
        isVolunteer={isVolunteer}
        setIsVolunteer={setIsVolunteer}
        handleApproveUser={handleApproveUser}
        handleIsDeclining={handleIsDeclining}
        loading={loading}
        user={user}
        editing={editing}
      />
      <UserPageBio
        about={about}
        setAbout={setAbout}
        phone={phone}
        setPhone={setPhone}
        hometown={hometown}
        setHometown={setHometown}
        editing={editing}
        user={user}
        loading={loading}
      />
      <UserPageJobInfo
        skills={skills}
        setSkills={setSkills}
        lastPosition={lastPosition}
        setLastPosition={setLastPosition}
        editing={editing}
        user={user}
        loading={loading}
      />
      <UserPageActions
        editing={editing}
        isUpdating={isUpdating}
        isDeleting={isDeleting}
        updateAction={handleSubmit}
        deleteAction={handleIsDeleting}
      />
      <UserPageJobsCarousel
        editing={editing}
        user={user}
        loading={loading}
      />
      <ImageLightbox
        open={imageOpen}
        onClose={handleImageOpen}
        imgUrl={user?.avatar}
      />
      <ApprovalDialog
        open={isDeleting}
        onClose={handleIsDeleting}
        text={translation.areYouSure}
        action={handleDelete}
      />
      <ApprovalDialog
        open={isDeclining}
        onClose={handleIsDeclining}
        text={translation.areYouSure}
        action={handleUnapproveUser}
      />
    </Container>
  );
}

export default User
