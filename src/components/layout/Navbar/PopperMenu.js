import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { checkPermissions } from '../../../utils'
import KingfisherIcon from '../../../KingfisherIcon'
import { Menu, MenuItem, Typography } from '@material-ui/core'

// Icons
import FavoriteIcon from '@material-ui/icons/Favorite'
// import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
// import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import AssignmentIcon from '@material-ui/icons/Assignment';
// import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import AssessmentIcon from '@material-ui/icons/Assessment';
// import AssessmentOutlinedIcon from '@material-ui/icons/AssessmentOutlined';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
// import SupervisorAccountOutlinedIcon from '@material-ui/icons/SupervisorAccountOutlined';

const PopperMenu = ({ value, anchorEl, handleMenuClose }) => {
  const { translation, theme } = useSelector(state => state.theme)
  const { volunteer, role } = useSelector(state => state.auth)

  return (
    <Menu elevation={1} className='desktop__menu rtl pt-1' anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleMenuClose}>
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
