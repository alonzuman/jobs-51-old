import React, { useState, useEffect } from 'react'
import { BottomNavigation, BottomNavigationAction, Typography, Button, Avatar, Menu, MenuItem } from '@material-ui/core'
import { Link, useHistory, NavLink } from 'react-router-dom'
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
import MenuIcon from '@material-ui/icons/Menu';
import { checkPermissions } from '../../utils'

const Navbar = () => {
  const { role, volunteer, avatar } = useSelector(state => state.auth)
  const { theme, translation } = useSelector(state => state.theme)
  const history = useHistory()
  const [value, setValue] = useState(history.location.pathname);
  const [width, setWidth] = useState(window.innerWidth)
  const [anchorEl, setAnchorEl] = useState(null)

  const handleMenuClose = () => setAnchorEl(null)
  const handleMenuOpen = e => setAnchorEl(e.currentTarget)

  useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth))
    return () => window.removeEventListener('resize', () => setWidth(window.innerWidth))
  }, [window.innerWidth])

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
    borderTopRightRadius: '1rem',
    borderTopLeftRadius: '1rem'
  }

  if (width <= 768) {
    if (checkPermissions(role) !== 0) {
      return (
        <BottomNavigation showLabels value={value} onChange={handleChange} style={navbarStyle}>
          <BottomNavigationAction label={translation.main} component={Link} to='/home' value='/home' icon={value === '/home' ? <AssignmentIcon /> : <AssignmentOutlinedIcon/>} />
          <BottomNavigationAction label={translation.saved} component={Link} to='/saved' value='/saved' icon={value === '/saved' ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />} />
          {volunteer && <BottomNavigationAction label={translation.activity} component={Link} to='/activity' value='/activity' icon={value === '/activity' ? <AssessmentIcon /> : <AssessmentOutlinedIcon />} />}
          <BottomNavigationAction label={translation.profile} component={Link} to='/profile' value='/profile' icon={value === '/profile' ? <AccountCircleIcon /> : <AccountCircleOutlinedIcon />} />
          {checkPermissions(role) >= 3 && <BottomNavigationAction label={translation.adminPage} component={Link} to='/admin' value='/admin' icon={value === '/admin' ? <SupervisorAccountIcon /> : <SupervisorAccountOutlinedIcon />} />}
        </BottomNavigation>
      )
    } else {
      return <div/>
    }
  } else {
    return (
      <>
        <Button onClick={handleMenuOpen} className='menu__button'><MenuIcon className='mr-25' /><Avatar className='avatar__xs' zIndex={9} src={avatar ? avatar : ''} /></Button>
        <Menu className='desktop__menu rtl pt-1' anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <NavLink to='/home'><MenuItem className='min__width--200' onClick={handleMenuClose}><Typography variant='body1'>{translation.main}</Typography></MenuItem></NavLink>
          <NavLink to='/saved'><MenuItem className='min__width--200' onClick={handleMenuClose}><Typography variant='body1'>{translation.saved}</Typography></MenuItem></NavLink>
          {volunteer && <NavLink to='/activity'><MenuItem className='min__width--200' onClick={handleMenuClose}><Typography variant='body1'>{translation.activity}</Typography></MenuItem></NavLink>}
          <NavLink to='/profile'><MenuItem className='min__width--200' onClick={handleMenuClose}><Typography variant='body1'>{translation.profile}</Typography></MenuItem></NavLink>
          {checkPermissions(role) >= 3 && <NavLink to='/admin'><MenuItem className='min__width--200' onClick={handleMenuClose}><Typography variant='body1'>{translation.adminPage}</Typography></MenuItem></NavLink>}
        </Menu>
      </>
    )
  }
}

export default Navbar
