import { Avatar, Button, CircularProgress, Divider, FormControl, ListItem, ListItemIcon, List, Switch, Typography, ListItemSecondaryAction, ListItemText } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { setTheme, signOut } from '../../actions'
import PageHeader from '../../v2/organisms/PageHeader'

// Icons
import Brightness4Icon from '@material-ui/icons/Brightness4';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import NotificationIcon from '../../v2/molecules/NotificationIcon'
import Container from '../../v2/atoms/Container'
import PageSection from '../../v2/atoms/PageSection'

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
      <Container>
        <PageSection>
          <PageHeader
            secondary={<Link to={`/users/${uid}`}><Avatar className='avatar__md' src={avatar} alt={firstName}>{firstName.charAt(0)}</Avatar></Link>}
            spaceTop
            spaceBottom
            title={translation.profile}
            subtitle={<Link to={`/users/${uid}`}><Button className='p-0 mt-25' color='primary'>{translation.viewProfile}</Button></Link>}
          />
        </PageSection>
        <PageSection>
          <List>
            <Typography variant='subtitle1'>{translation.general}</Typography>
            <Link to={`/${uid}/notifications`}>
              <ListItem disableGutters button>
                <ListItemIcon>
                  <NotificationIcon disableRipple />
                </ListItemIcon>
                <ListItemText>
                  {translation.notifications}
                </ListItemText>
              </ListItem>
            </Link>
            <Link to={`/${uid}/saved`}>
              <ListItem disableGutters button>
                <ListItemIcon>
                  <FavoriteBorderOutlinedIcon />
                </ListItemIcon>
                <ListItemText>
                  {translation.savedJobs}
                </ListItemText>
              </ListItem>
            </Link>
            <Divider className='mt-1 mb-1' />
            <Typography variant='subtitle1'>{translation.justProfile}</Typography>
            <Link to={`/users/${uid}/edit`}>
              <ListItem disableGutters button>
                <ListItemIcon>
                  <PermIdentityIcon />
                </ListItemIcon>
                <ListItemText>
                  {translation.editPersonalInfo}
                </ListItemText>
              </ListItem>
            </Link>
            <Divider className='mt-1 mb-1' />
            <Typography variant='subtitle1'>{translation.settings}</Typography>
            <ListItem disableGutters button onClick={handleToggleTheme}>
              <ListItemIcon>
                <Brightness4Icon />
              </ListItemIcon>
              <ListItemText>
                {translation.changeDisplay}
              </ListItemText>
              <ListItemSecondaryAction>
                <Switch color='primary' checked={theme.palette.type === 'dark'} onChange={handleToggleTheme} />
              </ListItemSecondaryAction>
            </ListItem>
            <Divider className='mt-1 mb-1' />
          </List>
          <Button size='large' className='button-style' color='primary' variant='outlined' onClick={handleSignOut}>{translation.signOut}</Button>
          <LinksContainer>
            <Link to='/privacy-policy'>
              <Button color='primary' className='pl-5 pr-5 p-0'>{translation.privacyPolicy}</Button>
            </Link>
          </LinksContainer>
        </PageSection>
      </Container>
    )
  }
}

export default Profile
