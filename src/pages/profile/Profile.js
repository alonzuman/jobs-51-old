import { Avatar, Button, CircularProgress, Divider, FormControl, MenuItem, MenuList, Switch, Typography } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import PageContainer from '../../components/layout/PageContainer'

// Icons
import LockIcon from '@material-ui/icons/Lock';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import PageHeader from '../../v2/organisms/PageHeader'
import { setTheme, signOut } from '../../actions'
import styled from 'styled-components'

const LinksContainer = styled.div`
  width: 100%;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  bottom: 96px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Profile = () => {
  const { translation, theme } = useSelector(state => state.theme)
  const { loading, uid, avatar, firstName } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const handleToggleTheme = () => {
    dispatch(setTheme())
  }

  const handleSignOut = () => {
    dispatch(signOut())
  }

  if (loading) {
    return <CircularProgress />
  } else {
    return (
      <PageContainer>
        <PageHeader
          secondary={<Link to={`/users/${uid}`}><Avatar className='avatar__md' src={avatar} alt={firstName}>{firstName.charAt(0)}</Avatar></Link>}
          spaceTop
          spaceBottom
          title={translation.profile}
          subtitle={<Link to={`/users/${uid}`}><Button className='p-0 pr-5 pl-5' color='primary'>{translation.viewProfile}</Button></Link>}
        />
        <MenuList>
          <Typography variant='subtitle1'>{translation.justProfile}</Typography>
          {/* <Link to='/profile/login-and-security'>
            <MenuItem className='flex justify__between full__width' button>
              <Typography variant='body1'>{translation.loginAndSecurity}</Typography>
              <LockIcon className='ml-1' />
            </MenuItem>
          </Link> */}
          <Link to={`/users/${uid}/edit`}>
            <MenuItem className='flex justify__between full__width' button>
              <Typography variant='body1'>{translation.personalInfo}</Typography>
              <AssignmentIndIcon className='ml-1' />
            </MenuItem>
          </Link>
          <Divider className='mt-1 mb-1' />
          <Typography variant='subtitle1'>{translation.settings}</Typography>
          <MenuItem className='flex justify__between full__width'>
            <Typography variant='body1'>{translation.changeDisplay}</Typography>
            <Switch color='primary' checked={theme.palette.type === 'dark'} onChange={handleToggleTheme} />
          </MenuItem>
          <Divider className='mt-1 mb-1' />
        </MenuList>
        <Button size='large' className='button-style' color='primary' variant='outlined' onClick={handleSignOut}>{translation.signOut}</Button>
        <LinksContainer>
          <Link to='/privacy-policy'>
            <Button color='primary' className='p-0'>{translation.privacyPolicy}</Button>
          </Link>
        </LinksContainer>
      </PageContainer>
    )
  }
}

export default Profile
