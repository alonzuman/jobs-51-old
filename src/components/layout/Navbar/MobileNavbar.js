import React, { useState, useEffect } from 'react'
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import { checkPermissions } from '../../../utils'
import { Link, useHistory } from 'react-router-dom'

// Icons
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import SupervisorAccountOutlinedIcon from '@material-ui/icons/SupervisorAccountOutlined';
import SearchIcon from '@material-ui/icons/Search';
import AssessmentOutlinedIcon from '@material-ui/icons/AssessmentOutlined';
import useCurrentUser from '../../../hooks/useCurrentUser'
import useTheme from '../../../hooks/useTheme'
import { FavoriteBorderOutlined } from '@material-ui/icons';

const MobileNavbar = () => {
  const history = useHistory()
  const { volunteer, role, uid } = useCurrentUser();
  const { theme, translation } = useTheme();
  const [value, setValue] = useState(history.location.pathname);

  history.listen(location => {
    const { pathname } = location;
    setValue(pathname)
  })

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

  return (
    <BottomNavigation showLabels value={value} onChange={handleChange} style={navbarStyle}>
      {checkPermissions(role) >= 2 &&
        <BottomNavigationAction
          label={translation.findJobs}
          component={Link}
          to='/home'
          value='/home'
          icon={<SearchIcon />}
        />}
      {checkPermissions(role) >= 3 &&
        <BottomNavigationAction
          label={translation.savedJobs}
          component={Link}
          to={`/${uid}/saved`}
          value={`/${uid}/saved`}
          icon={<FavoriteBorderOutlined />}
        />}
      {volunteer &&
        <BottomNavigationAction
          label={translation.activity}
          component={Link}
          to={`/${uid}/activity`}
          value={`/${uid}/activity`}
          icon={<AssessmentOutlinedIcon />}
        />}
      <BottomNavigationAction
        label={translation.profile}
        component={Link}
        to='/profile'
        value='/profile'
        icon={<AccountCircleOutlinedIcon />}
      />
      {checkPermissions(role) >= 3 &&
        <BottomNavigationAction
          label={translation.adminPage}
          component={Link}
          to='/admin'
          value='/admin'
          icon={<SupervisorAccountOutlinedIcon />}
        />}
    </BottomNavigation>
  )
}

export default MobileNavbar
