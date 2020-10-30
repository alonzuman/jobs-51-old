import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

import useWindowSize from '../../../hooks/useWindowSize'
import MobileNavbar from './MobileNavbar'
import DesktopNavbar from './DesktopNavbar'

const Navbar = () => {
  const { role, volunteer, uid } = useSelector(state => state.auth)
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
    return <MobileNavbar uid={uid} role={role} volunteer={volunteer} handleChange={handleChange} value={value} />
  } else {
    return <DesktopNavbar uid={uid} />
  }
}

export default Navbar
