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
import Container from '../../v2/atoms/Container'
import EditUserActivities from './components/EditUserActivities'
import { checkPermissions } from '../../utils'

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
  const [isLookingForJob, setIsLookingForJob] = useState(false)
  const [isVolunteer, setIsVolunteer] = useState(false)
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
  const [role, setRole] = useState('')
  const [stateApproved, setApproved] = useState(0)
  const [statePending, setPending] = useState(0)

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
      region,
      activities: {
        approved: stateApproved,
        pending: statePending
      },
      role
    }

    await dispatch(updateUser(newUser))
    await history.goBack()
  }

  const handleDelete = async () => {
    await dispatch(deleteUser(uid))
    history.goBack()
  }

  useEffect(() => {
    setFirstName(user?.firstName || '')
    setLastName(user?.lastName || '')
    setAvatar(user?.avatar || '')
    setIsLookingForJob(user?.lookingForJob || false)
    setIsVolunteer(user?.volunteer || false)
    setAbout(user?.about || '')
    setPhone(user?.phone || '')
    setHometown(user?.hometown || '')
    setLastPosition(user?.lastPosition || '')
    setSkills(user?.skills || [])
    setServiceYear(user?.serviceYear || '')
    setRegion(user?.region || '')
    setRole(user?.role || '')
    setPending(user?.activites?.pending || 0)
    setApproved(user?.activities?.approved || 0)
  }, [user])

  useEffect(() => {
    if (user?.uid !== uid) {
      dispatch(getUser(uid))
    }
  }, [dispatch, uid])

  const isAdmin = checkPermissions(role) >= 3;

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
        stateRole={role}
        setRole={setRole}
        editing
        />
      <EditUserActivities
        stateRegion={region}
        setRegion={setRegion}
        stateApproved={stateApproved}
        setApproved={setApproved}
        statePending={statePending}
        setPending={setPending}
        isVolunteer={isVolunteer}
        isAdmin={isAdmin}
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
