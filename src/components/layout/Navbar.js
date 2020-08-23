import React, { useState } from 'react'
import { AppBar, Toolbar, IconButton, BottomNavigation, Fab, BottomNavigationAction } from '@material-ui/core'
import { NavLink, Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { openDialog } from '../../actions'

import AddIcon from '@material-ui/icons/Add'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ExploreIcon from '@material-ui/icons/Explore';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const Navbar = () => {
  const dispatch = useDispatch()
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
  }

  const fabStyle = {
    position: 'fixed',
    bottom: '4.5rem',
    right: '1rem'
  }

  return (
    <BottomNavigation value={value} onChange={handleChange} style={navbarStyle}>
      <Fab color='primary' onClick={() => dispatch(openDialog({type: 'AddJob', title: 'addJob'}))} style={fabStyle}>
        <AddIcon />
      </Fab>
        <BottomNavigationAction component={Link} to='/results/jobs' value='/results/jobs' icon={<ExploreIcon />} />
        <BottomNavigationAction component={Link} to='/saved-jobs' value='/saved-jobs' icon={<FavoriteIcon />} />
        <BottomNavigationAction component={Link} to='/my-profile' value='/my-profile' icon={<AccountCircleIcon />} />
    </BottomNavigation>
  )
}

export default Navbar
