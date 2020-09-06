import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../actions/users'
import { Avatar, Box, Typography, Container, Grid, Chip } from '@material-ui/core'
import UserRoleActions from './admin/components/UserRoleActions'
import TopBar from '../components/layout/TopBar'
import { Skeleton } from '@material-ui/lab'
import { checkPermissions } from '../utils'
import PageContainer from '../components/layout/PageContainer'
import ChipsSkeleton from '../components/skeletons/ChipsSkeleton'
import StatsList from '../components/lists/StatsList'
import ImageLightbox from '../components/general/ImageLightbox'
import PaperContainer from '../components/layout/PaperContainer'

const User = ({ match }) => {
  const [imageOpen, setImageOpen] = useState(false)
  const { translation } = useSelector(state => state.theme)
  const { role } = useSelector(state => state.auth)
  const { loading, user } = useSelector(state => state.users)
  const uid = match.url.split('/')[2]
  const dispatch = useDispatch()

  useEffect(() => { dispatch(getUser(uid)) }, [])

  const items = [
    { label: translation.approved, big: user?.activities?.approved, link: `/users/${uid}/activities` },
    { label: translation.pending, big: user?.activities?.pending, link: `/users/${uid}/activities` }
  ]

  return (
    <>
      <TopBar
        sticky={true}
        backButton={true}
        title={!loading ? `${user?.firstName} ${user?.lastName}` : <Skeleton width={180} />}
        subtitle={!loading ? user.serviceYear ? `${translation.serviceYear} ${user?.serviceYear}` : '' : <Skeleton width={100} />}
      >
        {!loading ? <Avatar style={{cursor: 'pointer'}} onClick={user?.avatar ? () => setImageOpen(true) : null} className='avatar__md' src={user?.avatar} alt={user?.firstName}>{user?.firstName?.charAt(0)}</Avatar> : <Skeleton variant='circle' className='avatar__md' />}
      </TopBar>
      <PageContainer className='flex justify__between align__center flex__column'>
        {user?.lookingForJob && <Chip color='primary' label={user.lookingForJob ? translation.iAmLookingForAJob : ''} />}
        {user?.role === 'volunteer' &&
        <PaperContainer style={{ marginBottom: '1rem' }}>
          <Typography variant='subtitle1'>{!loading ? translation.IVolunteerIn : <Skeleton height={18} width={80} />}</Typography>
          <Typography variant='body1'>{!loading ? (user?.region ? user?.region : '') : <Skeleton height={32} width={120}/> }</Typography>
          {!loading ?
          <>
            <Typography style={{ marginBottom: '.5rem' }} variant='subtitle1'>{!loading ? translation.totalActivities : <Skeleton height={18} width={80} />}</Typography>
            <StatsList items={items} />
          </>:
          <div className='flex justify__between align__center'>
            <Skeleton className='border__radius_1' style={{ marginLeft: '1rem' }} height={180} width={'100%'} />
            <Skeleton className='border__radius_1' height={180} width={'100%'} />
          </div>}
        </PaperContainer>}
        <PaperContainer style={{ marginBottom: '1rem' }}>
          <Typography variant='subtitle1'>{!loading ? translation.contactDetails : <Skeleton height={18} width={70} />}</Typography>
          <Typography variant='body1'>{!loading ? user?.email : <Skeleton height={32} width={120} />}</Typography>
          <Typography variant='body1'>{!loading ? (user?.phone ? user?.phone : '') : <Skeleton height={32} width={90} />}</Typography>
          {user?.preferredLocation && <Typography variant='body1'>{!loading ? user?.preferredLocation : <Skeleton height={32} width={110} />}</Typography>}
        </PaperContainer>
        {!loading ? user?.lastPosition &&
        (<PaperContainer style={{ marginBottom: '1rem' }}>
          <Typography variant='subtitle1'>{translation.lastPosition}</Typography>
          <Typography variant='body1'>{user?.lastPosition}</Typography>
        </PaperContainer>) : <Skeleton height={32} width={110} />}
        {!loading ? user?.skills &&
        <PaperContainer style={{ marginBottom: '1rem' }}>
          <Typography variant='subtitle1'>{translation.skillsInterestedIn}</Typography>
          <Grid container spacing={1}>
            {user?.skills?.map((skill, index) => <Grid item key={index}><Chip label={skill} /></Grid>)}
          </Grid>
        </PaperContainer> : <ChipsSkeleton count={4} />}
        <PaperContainer style={{ marginBottom: '1rem' }}>
          <Typography variant='subtitle1'>{translation.userType}</Typography>
          {checkPermissions(role) >= 5 && <UserRoleActions />}
        </PaperContainer>
        <ImageLightbox open={imageOpen} onClose={() => setImageOpen(false)} imgUrl={user?.avatar} />
      </PageContainer>
    </>
  )
}

export default User
