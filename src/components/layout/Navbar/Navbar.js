import React, { useState, useEffect } from 'react'
import { BottomNavigation, BottomNavigationAction, Typography, Button, Avatar, Menu, MenuItem } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './Navbar.css'

import { checkPermissions } from '../../../utils'
import useWindowSize from '../../../hooks/useWindowSize'
import MobileNavbar from './MobileNavbar'
import DesktopNavbar from './DesktopNavbar'

const Navbar = () => {
  const { role, volunteer, avatar } = useSelector(state => state.auth)
  const history = useHistory()
  const [value, setValue] = useState(history.location.pathname);
  const { windowWidth: width } = useWindowSize()



  useEffect(() => {
    setValue(history.location.pathname)
  }, [history.location.pathname])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (!role) {
    return <div />
  } else if (width <= 768) {
    return <MobileNavbar role={role} volunteer={volunteer} handleChange={handleChange} value={value} />
  } else {
    return <DesktopNavbar />
  }
}

export default Navbar
