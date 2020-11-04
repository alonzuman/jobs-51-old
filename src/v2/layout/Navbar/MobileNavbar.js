import { Badge, BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { checkPermissions } from '../../../utils'
import { Link } from 'react-router-dom'

// Icons
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import ActivityIcon from '../../molecules/ActivityIcon';
import SupervisorAccountOutlinedIcon from '@material-ui/icons/SupervisorAccountOutlined';
import SearchIcon from '@material-ui/icons/Search';

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
      {/* <BottomNavigationAction
        label={translation.findJobs}
        component={Link}
        to='/home'
        value='/home'
        icon={<SearchIcon />}
      /> */}
      {volunteer &&
        <BottomNavigationAction
          label={translation.activity}
          component={Link}
          to={`/${uid}/activity`}
          value={`/${uid}/activity`}
          icon={<ActivityIcon />}
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
