import { Card, CardContent, Grid, Typography } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import PageContainer from '../components/layout/PageContainer'
import TopBar from '../components/layout/TopBar'

// Icons
import SettingsIcon from '@material-ui/icons/Settings';
import LockIcon from '@material-ui/icons/Lock';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';

// const menuItems = [
//   { label: 'Edit Profile', icon: '', link: '/profile/personal-info' },
//   { label: 'Login & Security', icon: '', link: '/profile/login-and-security' },
//   { label: 'Settings', icon: '', link: '/profile/settings' },
// ]

const Profile = () => {
  const { translation } = useSelector(state => state.theme)

  return (
    <>
      <TopBar title={translation.profile} />
      <PageContainer>
        <Grid container spacing={2}>
          <Grid item xs={6} md={4} lg={4}>
            <Link to='/profile/login-and-security'>
              <Card className='p-1 flex align__center justify__center flex__column'>
                <LockIcon />
                <Typography variant='subtitle1'>{translation.loginAndSecurity}</Typography>
              </Card>
            </Link>
          </Grid>
          <Grid item xs={6} md={4} lg={4}>
            <Link to='/profile/personal-info'>
              <Card className='p-1 flex align__center justify__center flex__column'>
                <AssignmentIndIcon />
                <Typography variant='subtitle1'>{translation.personalInfo}</Typography>
              </Card>
            </Link>
          </Grid>
          <Grid item xs={6} md={4} lg={4}>
            <Link to='/profile/settings'>
              <Card className='p-1 flex align__center justify__center flex__column'>
                <SettingsIcon />
                <Typography variant='subtitle1'>{translation.settings}</Typography>
              </Card>
            </Link>
          </Grid>
        </Grid>
      </PageContainer>
    </>
  )
}

export default Profile
