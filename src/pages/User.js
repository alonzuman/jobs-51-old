import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../actions/users'
import { Avatar, Box, Typography, Container } from '@material-ui/core'
import UserRoleActions from './admin/components/UserRoleActions'
import TopBar from '../components/layout/TopBar'
import { Skeleton } from '@material-ui/lab'
import { checkPermissions } from '../utils'

const User = ({ match }) => {
  const { translation } = useSelector(state => state.theme)
  const { role } = useSelector(state => state.auth)
  const { loading, user } = useSelector(state => state.users)
  const uid = match.url.split('/')[2]
  const dispatch = useDispatch()

  useEffect(() => { dispatch(getUser(uid)) }, [])

  return (
    <>
      <TopBar backButton={true} />
      <Container className='flex justify__between align__center flex__column'>
        <div className='mb-1 flex justify__between align__center full__width'>
          <div>
            <Typography variant='h1'>{!loading ? `${user?.firstName} ${user?.lastName}` : <Skeleton width={140} />}</Typography>
            <Typography variant='subtitle1'>{!loading ? user.serviceYear ? `${translation.serviceYear} ${user?.serviceYear}` : '' : <Skeleton width={100} />}</Typography>
          </div>
          {loading ? <Skeleton variant='circle' className='avatar__md' /> : <Avatar className='avatar__md' src={user?.avatar} alt={user?.firstName}>{user?.firstName?.charAt(0)}</Avatar>}
        </div>
        {checkPermissions(role) >= 4 && <UserRoleActions />}
      </Container>
    </>
  )
}

export default User
