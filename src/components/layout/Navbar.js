import React, { useState } from 'react'
import { BottomNavigation, BottomNavigationAction, Typography } from '@material-ui/core'
import { Link, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './Navbar.css'
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
import { checkPermissions } from '../../utils'

const Navbar = () => {
  const { role } = useSelector(state => state.auth)
  const { theme, translation } = useSelector(state => state.theme)
  const history = useHistory()
  const [value, setValue] = useState(history.location.pathname);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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

  if (checkPermissions(role) !== 0) {
    return (
      <BottomNavigation showLabels value={value} onChange={handleChange} style={navbarStyle}>
        <BottomNavigationAction label={translation.jobs} component={Link} to='/jobs' value='/jobs' icon={value === '/jobs' ? <AssignmentIcon /> : <AssignmentOutlinedIcon/>} />
        <BottomNavigationAction label={translation.saved} component={Link} to='/saved' value='/saved' icon={value === '/saved' ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />} />
        {checkPermissions(role) >= 2 && <BottomNavigationAction label={translation.activity} component={Link} to='/activity' value='/activity' icon={value === '/activity' ? <AssessmentIcon /> : <AssessmentOutlinedIcon />} />}
        <BottomNavigationAction label={translation.profile} component={Link} to='/profile' value='/profile' icon={value === '/profile' ? <AccountCircleIcon /> : <AccountCircleOutlinedIcon />} />
        {checkPermissions(role) >= 3 && <BottomNavigationAction label={translation.admin} component={Link} to='/admin' value='/admin' icon={value === '/admin' ? <SupervisorAccountIcon /> : <SupervisorAccountOutlinedIcon />} />}
      </BottomNavigation>
    )
  } else {
    return <div/>
  }
}

export default Navbar
