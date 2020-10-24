import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { approveUser, deleteUser, getUser, unapproveUser, updateUser } from '../../actions/users'
import ImageLightbox from '../../components/general/ImageLightbox'
import UserPageJobInfo from './components/UserPageJobInfo'
import UserPageBio from './components/UserPageBio'
import UserPageBadges from './components/UserPageBadges'
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
  const { translation } = useSelector(state => state.theme)
  const history = useHistory()
  const { loading, user, isUpdating } = useSelector(state => state.users)
  const uid = match.params.id
  const dispatch = useDispatch()

  // User fields for update
  const [isLookingForJob, setIsLookingForJob] = useState(null)
  const [isVolunteer, setIsVolunteer] = useState(null)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [avatar, setAvatar] = useState('')
  const [phone, setPhone] = useState('')
  const [about, setAbout] = useState('')
  const [hometown, setHometown] = useState('')
  const [lastPosition, setLastPosition] = useState('')
  const [skills, setSkills] = useState([])
  const [serviceYear, setServiceYear] = useState('')
  const [region, setRegion] = useState('')

  const handleSubmit = async () => {
    const newUser = {
      ...user,
      uid,
      firstName,
      lastName,
      lookingForJob: isLookingForJob,
      volunteer: isVolunteer,
      about,
      phone,
      lastPosition,
      skills,
      hometown,
      serviceYear,
      region
    }
    await dispatch(updateUser({ newUser, oldUser: user}))
    await history.goBack()
  }

  const handleDelete = async () => {
    await dispatch(deleteUser({ uid, firstName: user?.firstName, lastName: user?.lastName }))
    history.goBack()
  }

  useEffect(() => {
    setFirstName(user?.firstName)
    setLastName(user?.lastName)
    setAvatar(user?.avatar)
    setIsLookingForJob(!!user?.lookingForJob)
    setIsVolunteer(!!user?.volunteer)
    setAbout(user?.about || '')
    setPhone(user?.phone || '')
    setHometown(user?.hometown || '')
    setLastPosition(user?.lastPosition || '')
    setSkills(user?.skills || [])
    setServiceYear(user?.serviceYear || '')
    setRegion(user?.region || '')
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
  const handleEditing = () => history.goBack()
  const handleUnapproveUser = async () => {
    await dispatch(unapproveUser(uid))
    history.goBack()
  }

  return (
    <Container>
      <UserPageHeader
        handleImageOpen={handleImageOpen}
        editing
        handleEditing={handleEditing}
        loading={loading}
        user={user}
        stateFirstName={firstName}
        setFirstName={setFirstName}
        stateLastName={lastName}
        setLastName={setLastName}
        stateAvatar={avatar}
        setAvatar={setAvatar}
        stateServiceYear={serviceYear}
        setServiceYear={setServiceYear}
        handleSubmit={handleSubmit}
      />
      <UserPageBadges
        isLookingForJob={isLookingForJob}
        setIsLookingForJob={setIsLookingForJob}
        isVolunteer={isVolunteer}
        setIsVolunteer={setIsVolunteer}
        handleApproveUser={handleApproveUser}
        handleIsDeclining={handleIsDeclining}
        stateRegion={region}
        setRegion={setRegion}
        loading={loading}
        user={user}
        editing
      />
      <UserPageBio
        about={about}
        setAbout={setAbout}
        phone={phone}
        setPhone={setPhone}
        hometown={hometown}
        setHometown={setHometown}
        editing
        user={user}
        loading={loading}
      />
      <UserPageJobInfo
        skills={skills}
        setSkills={setSkills}
        lastPosition={lastPosition}
        setLastPosition={setLastPosition}
        editing
        user={user}
        loading={loading}
      />
      <UserPageActions
        editing
        loading={loading}
        isUpdating={isUpdating}
        isDeleting={isDeleting}
        updateAction={handleSubmit}
        deleteAction={handleIsDeleting}
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
