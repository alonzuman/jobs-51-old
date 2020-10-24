import { BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { checkPermissions } from '../../../utils'
import { Link } from 'react-router-dom'

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

// TODO change to styled components
const MobileNavbar = ({ volunteer, role, handleChange, value, uid }) => {
  const { theme, translation } = useSelector(state => state.theme)

  const navbarStyle = {
    top: 'auto',
    position: 'fixed',
    bottom: 0,
    width: '100%',
    height: 'fit-content',
    zIndex: 9,
    backgroundColor: theme.palette.background.paper,
    borderTop: `1px solid ${theme.palette.border.main}`,
  }

  return (
    <BottomNavigation showLabels value={value} onChange={handleChange} style={navbarStyle}>
      <BottomNavigationAction label={translation.main} component={Link} to='/home' value='/home' icon={value === '/home' ? <AssignmentIcon /> : <AssignmentOutlinedIcon />} />
      <BottomNavigationAction label={translation.saved} component={Link} to={`/${uid}/saved`} value='/saved' icon={value === '/saved' ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />} />
      {volunteer && <BottomNavigationAction label={translation.activity} component={Link} to={`/${uid}/activity`} value='/activity' icon={value === '/activity' ? <AssessmentIcon /> : <AssessmentOutlinedIcon />} />}
      <BottomNavigationAction label={translation.profile} component={Link} to='/profile' value='/profile' icon={value === '/profile' ? <AccountCircleIcon /> : <AccountCircleOutlinedIcon />} />
      {checkPermissions(role) >= 3 && <BottomNavigationAction label={translation.adminPage} component={Link} to='/admin' value='/admin' icon={value === '/admin' ? <SupervisorAccountIcon /> : <SupervisorAccountOutlinedIcon />} />}
    </BottomNavigation>
  )
}

export default MobileNavbar
