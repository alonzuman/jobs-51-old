import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, getUser } from '../actions/users'
import { Avatar, Typography, Grid, Chip, IconButton, Button, Paper } from '@material-ui/core'
import UserRoleActions from './admin/components/UserRoleActions'
import TopBar from '../components/layout/TopBar'
import { Skeleton } from '@material-ui/lab'
import { checkPermissions } from '../utils'
import PageContainer from '../components/layout/PageContainer'
import ChipsSkeleton from '../components/skeletons/ChipsSkeleton'
import StatsList from '../components/lists/StatsList'
import ImageLightbox from '../components/general/ImageLightbox'
import CustomChip from '../components/cards/CustomChip'
import ToggleVolunteer from '../components/forms/profile/ToggleVolunteer'
import ChangeRegion from '../components/forms/profile/ChangeRegion'
import ToggleLookingForJob from '../components/forms/profile/ToggleLookingForJob'
import ApprovalBox from '../components/dialogs/ApprovalBox'

// Icons
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import MailIcon from '@material-ui/icons/Mail';
import PhoneIcon from '@material-ui/icons/Phone';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import WorkIcon from '@material-ui/icons/Work';

const User = ({ match }) => {
  const [imageOpen, setImageOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [editing, setEditing] = useState(false)
  const { translation } = useSelector(state => state.theme)
  const { role } = useSelector(state => state.auth)
  const { loading, user } = useSelector(state => state.users)
  const uid = match.url.split('/')[2]
  const dispatch = useDispatch()

  useEffect(() => { dispatch(getUser(uid)) }, [dispatch, uid])

  const items = [
    {
      label: translation.approved,
      big: user?.activities?.approved.toFixed(1),
      link: `/users/${uid}/activities`,
      marker: "#4caf50",
    },
    {
      label: translation.pending,
      big: user?.activities?.pending.toFixed(1),
      link: `/users/${uid}/activities`,
      marker: "#e15757",
    },
  ];

  const smallIconStyle = {
    height: 18,
    width: 18,
    marginLeft: '1rem',
  }

  return (
    <>
      <TopBar
        sticky={true}
        backButton={true}
        title={(!loading && user.firstName) ? `${user?.firstName} ${user?.lastName}` : <Skeleton width={180} />}
        subtitle={(!loading && user) ? user.serviceYear ? `${translation.serviceYear} ${user?.serviceYear}` : "" : <Skeleton width={100} />}
        actionOnClick={() => setEditing(!editing)}
        action={checkPermissions(role) >= checkPermissions(user?.role) && <IconButton style={{ height: 42, width: 42 }} className='m-5'>{editing ? <DoneIcon /> : <EditIcon />}</IconButton>}>
        {!loading ?
          <Avatar style={{ cursor: "pointer" }} onClick={user?.avatar ? () => setImageOpen(true) : null} className="avatar__md" src={user?.avatar} alt={user?.firstName}>
            {user?.firstName?.charAt(0)}
          </Avatar> :
          <Skeleton variant="circle" className="avatar__md" />}
      </TopBar>
      <PageContainer>
        {editing && checkPermissions(role) >= 3 &&
          <Paper className='p-1 mb-1'>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography variant="subtitle1">
                  {translation.userType}
                </Typography>
                <UserRoleActions />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1">
                  {translation.region}
                </Typography>
                <ChangeRegion />
              </Grid>
            </Grid>
            <ToggleVolunteer user={user} />
            <ToggleLookingForJob uid={user?.uid} lookingForJob={user?.lookingForJob} />
          </Paper>}
        {!editing && user?.lookingForJob &&
          <CustomChip
            style={{ marginBottom: "1rem" }}
            color="primary"
            label={user.lookingForJob ? translation.iAmLookingForAJob : ""}
          />}
        {!editing && user?.volunteer && user?.region &&
          <div className='mb-1'>
            <Typography className='mb-1' variant="body1">
              {`${translation.totalHoursInRegion} ${user?.region}`}
            </Typography>
            {checkPermissions(role) >= 3 && <StatsList items={items} />}
          </div>}
        {!editing &&
          <>
            <Typography variant="subtitle1">{!editing && !loading && user.firstName ? translation.contactDetails : <Skeleton height={18} width={70} />}</Typography>
            <Paper className='p-1 mb-1'>
              <Typography variant="body1">{!loading && user.email ? <span className='flex align__center'><MailIcon style={smallIconStyle} /> {user?.email}</span> : <Skeleton height={32} width={120} />}</Typography>
              <Typography variant="body1">{!loading ? user?.phone ? <span className='flex align__center'><PhoneIcon style={smallIconStyle} /> {user?.phone}</span> : '' : <Skeleton height={32} width={90} />}</Typography>
              {user?.preferredLocation && <Typography variant="body1">{!loading ? <span className='flex align__center'><LocationCityIcon style={smallIconStyle} /> {user?.preferredLocation}</span> : <Skeleton height={32} width={110} />}</Typography>}
            </Paper>
          </>
        }
        {!loading ?
          user?.lastPosition &&
          !editing &&
          <>
            <Typography variant="subtitle1">
              {translation.lastPosition}
            </Typography>
            <Paper className='p-1 mb-1'>
              <Typography variant="body1"><span className='flex align__center'><WorkIcon style={smallIconStyle} />{user?.lastPosition}</span></Typography>
            </Paper> </> :
          <Skeleton height={32} width={110} />}
        {!editing && !loading ? user?.skills && user.skills.length > 0 &&
          <>
            <Typography variant="subtitle1">
              {translation.skillsInterestedIn}
            </Typography>
            <Paper className='p-1 mb-1'>
              <Grid container spacing={1}>
                {user?.skills?.map((skill, index) => (
                  <Grid item key={index}>
                    <Chip label={skill} />
                  </Grid>
                ))}
              </Grid>
            </Paper> </> :
          !editing && <ChipsSkeleton
            style={{ marginBottom: ".5rem", marginTop: ".5rem" }}
            count={4}
          />}
        {editing && checkPermissions(role) >= 3 && <Button onClick={() => setDeleting(true)} color='secondary'>{translation.deleteUser}</Button>}
        {editing && checkPermissions(role) >= 3 && <ApprovalBox open={deleting} setOpen={setDeleting} action={() => dispatch(deleteUser(uid))} text={translation.areYouSure} />}
        <ImageLightbox
          open={imageOpen}
          onClose={() => setImageOpen(false)}
          imgUrl={user?.avatar}
        />
      </PageContainer>
    </>
  );
}

export default User
