import { Avatar, Button, CircularProgress, Divider, FormControl, ListItem, ListItemIcon, List, Switch, Typography, ListItemSecondaryAction, ListItemText } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { setTheme, signOut } from '../../actions'
import PageHeader from '../../v2/organisms/PageHeader'
import PageSection from '../../v2/atoms/PageSection'
import NotificationIcon from '../../v2/molecules/NotificationIcon'
import Container from '../../v2/atoms/Container'

// Icons
import Brightness4Icon from '@material-ui/icons/Brightness4';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import InfoIcon from '@material-ui/icons/Info';

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
            <Typography variant='subtitle1'>{translation.info}</Typography>
            <Link to='/privacy-policy'>
              <ListItem button disableGutters>
                <ListItemIcon>
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText>
                  {translation.privacyPolicy}
                </ListItemText>
              </ListItem>
            </Link>
          </List>
          <Button size='large' className='button-style' color='primary' variant='outlined' onClick={handleSignOut}>{translation.signOut}</Button>
        </PageSection>
      </Container>
    )
  }
}

export default Profile
