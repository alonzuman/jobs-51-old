import { Avatar, Button, CircularProgress, Divider, FormControl, ListItem, ListItemIcon, List, Switch, Typography, ListItemSecondaryAction, ListItemText } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import PageContainer from '../../components/layout/PageContainer'
import styled from 'styled-components'
import { setTheme, signOut } from '../../actions'
import PageHeader from '../../v2/organisms/PageHeader'

// Icons
import Brightness4Icon from '@material-ui/icons/Brightness4';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import NotificationIcon from '../../v2/molecules/NotificationIcon'

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
        <List>
          <Link to={`/${uid}/notifications`}>
            <ListItem button>
              <ListItemIcon>
                <NotificationIcon disableRipple />
              </ListItemIcon>
              <ListItemText>
                {translation.notifications}
              </ListItemText>
            </ListItem>
          </Link>
          <Link to={`/${uid}/saved`}>
            <ListItem button>
              <ListItemIcon>
                <FavoriteBorderOutlinedIcon />
              </ListItemIcon>
              <ListItemText>
                {translation.savedJobs}
              </ListItemText>
            </ListItem>
          </Link>
          <Typography variant='subtitle1'>{translation.justProfile}</Typography>
          <Link to={`/users/${uid}/edit`}>
            <ListItem button>
              <ListItemIcon>
                <AssignmentIndIcon />
              </ListItemIcon>
              <ListItemText>
                {translation.editPersonalInfo}
              </ListItemText>
            </ListItem>
          </Link>
          <Divider className='mt-1 mb-1' />
          <Typography variant='subtitle1'>{translation.settings}</Typography>
          <ListItem button onClick={handleToggleTheme}>
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
      </PageContainer>
    )
  }
}

export default Profile
