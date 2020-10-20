import React, { useState } from 'react'

// Icons
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import AssessmentIcon from '@material-ui/icons/Assessment';
import AssessmentOutlinedIcon from '@material-ui/icons/AssessmentOutlined';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import SupervisorAccountOutlinedIcon from '@material-ui/icons/SupervisorAccountOutlined';
import MenuIcon from '@material-ui/icons/Menu';
import { useSelector } from 'react-redux';
import { Avatar, Button, Menu, MenuItem, Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { checkPermissions } from '../../../utils';
import styled from 'styled-components';

const Container = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
`

const Wrapper = styled.div`
  max-width: 1024px;
  margin: 0 auto;
`

const DesktopNavbar = ({ value }) => {
  const { avatar, volunteer, role } = useSelector(state => state.auth)
  const [anchorEl, setAnchorEl] = useState(null)
  const [hover, setHover] = useState(false)
  const { theme, translation } = useSelector(state => state.theme)

  const handleHover = () => setHover(!hover)
  const handleMenuClose = () => setAnchorEl(null)
  const handleMenuOpen = e => setAnchorEl(e.currentTarget)

  const menuButtonStyle = {
    borderRadius: '2rem',
    backgroundColor: hover ? theme.palette.background.dark : theme.palette.background.paper,
    margin: '.5rem',
    zIndex: 1101
  }

  return (
    <Container>
      <Wrapper>
        <Button onClick={handleMenuOpen} onMouseEnter={handleHover} onMouseLeave={handleHover} style={menuButtonStyle}>
          <MenuIcon className='mr-25' />
          <Avatar className='avatar__xs' src={avatar ? avatar : ''} />
        </Button>
        <Menu className='desktop__menu rtl pt-1' anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <NavLink to='/home'>
            <MenuItem className='min__width--200 mb-5' onClick={handleMenuClose}>
              <Typography className='flex align__center justify__between full__width' variant='body1'>
                {translation.main}
                <AssignmentIcon style={{ color: value === '/home' ? theme.palette.primary.main : theme.typography.subtitle1.color }} />
              </Typography>
            </MenuItem>
          </NavLink>
          <NavLink to='/saved'>
            <MenuItem className='min__width--200 mb-5' onClick={handleMenuClose}>
              <Typography className='flex align__center justify__between full__width' variant='body1'>
                {translation.saved}
                <FavoriteIcon style={{ color: value === '/saved' ? theme.palette.primary.main : theme.typography.subtitle1.color }} />
              </Typography>
            </MenuItem>
          </NavLink>
          {volunteer && <NavLink to='/activity'>
            <MenuItem className='min__width--200 mb-5' onClick={handleMenuClose}>
              <Typography className='flex align__center justify__between full__width' variant='body1'>
                {translation.activity}
                <AssessmentIcon style={{ color: value === '/activity' ? theme.palette.primary.main : theme.typography.subtitle1.color }} />
              </Typography>
            </MenuItem>
          </NavLink>}
          <NavLink to='/profile/user-details'>
            <MenuItem className='min__width--200 mb-5' onClick={handleMenuClose}>
              <Typography className='flex align__center justify__between full__width' variant='body1'>
                {translation.profile}
                <AccountCircleIcon style={{ color: value === '/profile/user-details' ? theme.palette.primary.main : theme.typography.subtitle1.color }} />
              </Typography>
            </MenuItem>
          </NavLink>
          {checkPermissions(role) >= 3 &&
            <NavLink to='/admin'>
              <MenuItem className='min__width--200 mb-5' onClick={handleMenuClose}>
                <Typography className='flex align__center justify__between full__width' variant='body1'>
                  {translation.adminPage}
                  <SupervisorAccountIcon style={{ color: value === '/admin' ? theme.palette.primary.main : theme.typography.subtitle1.color }} />
                </Typography>
              </MenuItem>
            </NavLink>}
        </Menu>
      </Wrapper>
    </Container>
  )
}

export default DesktopNavbar
