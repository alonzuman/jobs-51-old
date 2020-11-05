import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { checkPermissions } from '../../../utils'
import { Menu, MenuItem, Typography } from '@material-ui/core'

// Icons
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AssessmentIcon from '@material-ui/icons/Assessment';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import SearchIcon from '@material-ui/icons/Search';
import NotificationIcon from '../../molecules/NotificationIcon'

const PopperMenu = ({ value, anchorEl, handleMenuClose, uid }) => {
  const { translation, theme } = useSelector(state => state.theme)
  const { volunteer, role } = useSelector(state => state.auth)

  return (
    <Menu elevation={1} className='desktop__menu rtl pt-1' anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleMenuClose}>
      {/* <NavLink to='/home'>
        <MenuItem className='min__width--200 mb-5' onClick={handleMenuClose}>
          <Typography className='flex align__center justify__between full__width' variant='body1'>
            {translation.findJobs}
            <SearchIcon style={{ color: value === '/home' ? theme.palette.primary.main : theme.typography.subtitle1.color }} />
          </Typography>
        </MenuItem>
      </NavLink> */}
      {volunteer && <NavLink to={`/${uid}/activity`}>
        <MenuItem className='min__width--200 mb-5' onClick={handleMenuClose}>
          <Typography className='flex align__center justify__between full__width' variant='body1'>
            {translation.activity}
            <AssessmentIcon style={{ color: value === `/${uid}/activity` ? theme.palette.primary.main : theme.typography.subtitle1.color }} />
          </Typography>
        </MenuItem>
      </NavLink>}
      <NavLink to={`/${uid}/notifications`}>
        <MenuItem className='min__width--200 mb-5' onClick={handleMenuClose}>
          <Typography className='flex align__center justify__between full__width' variant='body1'>
            {translation.notifications}
            <NotificationIcon style={{ color: value === `/${uid}/notifications` ? theme.palette.primary.main : theme.typography.subtitle1.color }} />
          </Typography>
        </MenuItem>
      </NavLink>
      <NavLink to='/profile'>
        <MenuItem className='min__width--200 mb-5' onClick={handleMenuClose}>
          <Typography className='flex align__center justify__between full__width' variant='body1'>
            {translation.profile}
            <AccountCircleIcon style={{ color: value === '/profile' ? theme.palette.primary.main : theme.typography.subtitle1.color }} />
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
  )
}

export default PopperMenu
