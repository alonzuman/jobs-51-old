import React, { useState } from 'react'
import { AppBar, Toolbar, IconButton, BottomNavigation, Fab, BottomNavigationAction } from '@material-ui/core'
import { NavLink, Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { openDialog } from '../../actions'

import AddIcon from '@material-ui/icons/Add'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import ExploreIcon from '@material-ui/icons/Explore';
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';

const Navbar = () => {
  const { theme } = useSelector(state => state.theme)
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
    borderBottom: `1px solid ${theme.palette.background.default}`
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
        <BottomNavigationAction component={Link} to='/results/jobs' value='/results/jobs' icon={value === '/results/jobs' ? <ExploreIcon /> : <ExploreOutlinedIcon/>} />
        <BottomNavigationAction component={Link} to='/saved-jobs' value='/saved-jobs' icon={value === '/saved-jobs' ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />} />
      <BottomNavigationAction component={Link} to='/my-profile' value='/my-profile' icon={value === '/my-profile' ? <AccountCircleIcon /> : <AccountCircleOutlinedIcon />} />
    </BottomNavigation>
  )
}

export default Navbar
