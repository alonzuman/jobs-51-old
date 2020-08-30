import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../actions/users'
import { Avatar, Box, Typography, Container, Grid, Chip } from '@material-ui/core'
import UserRoleActions from './admin/components/UserRoleActions'
import TopBar from '../components/layout/TopBar'
import { Skeleton } from '@material-ui/lab'
import { checkPermissions } from '../utils'
import PageContainer from '../components/layout/PageContainer'

const User = ({ match }) => {
  const { translation } = useSelector(state => state.theme)
  const { role } = useSelector(state => state.auth)
  const { loading, user } = useSelector(state => state.users)
  const uid = match.url.split('/')[2]
  const dispatch = useDispatch()

  useEffect(() => { dispatch(getUser(uid)) }, [])

  console.log(user)

  return (
    <>
      <TopBar backButton={true} />
      <PageContainer className='flex justify__between align__center flex__column'>
        <div className='mb-1 flex justify__between align__center full__width'>
          <div>
            <Typography variant='h1'>{!loading ? `${user?.firstName} ${user?.lastName}` : <Skeleton width={140} />}</Typography>
            <Typography variant='subtitle1'>{!loading ? user.serviceYear ? `${translation.serviceYear} ${user?.serviceYear}` : '' : <Skeleton width={100} />}</Typography>
          </div>
          {loading ? <Skeleton variant='circle' className='avatar__md' /> : <Avatar className='avatar__md' src={user?.avatar} alt={user?.firstName}>{user?.firstName?.charAt(0)}</Avatar>}
        </div>
        {user?.lookingForJob && <Chip color='primary' label={translation.iAmLookingForAJob} />}

        {user?.role === 'volunteer' &&
        <>
          <Typography variant='subtitle1'>{translation.IVolunteerIn}</Typography>
          <Typography variant='body1'>{user?.region ? user?.region : ''}</Typography>
        </>}

        <Typography variant='subtitle1'>{translation.contactDetails}</Typography>
        <Typography variant='body1'>{user?.email}</Typography>
        <Typography variant='body1'>{user?.phone ? user?.phone : ''}</Typography>
        {user?.preferredLocation && <Typography variant='body1'>{user?.preferredLocation}</Typography>}

        {user?.lastPosition &&
        <>
          <Typography variant='subtitle1'>{translation.lastPosition}</Typography>
          <Typography variant='body1'>{user?.lastPosition}</Typography>
        </>}
        {user?.skills &&
        <>
          <Typography variant='subtitle1'>{translation.skillsInterestedIn}</Typography>
          <Grid container spacing={1}>
            {user?.skills?.map((skill, index) => <Grid item key={index}><Chip label={skill} /></Grid>)}
          </Grid>
        </>}
        <br />
        {checkPermissions(role) >= 4 && <UserRoleActions />}
      </PageContainer>
    </>
  )
}

export default User
