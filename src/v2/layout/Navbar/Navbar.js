import React from 'react'
import { useSelector } from 'react-redux'

import useWindowSize from '../../../hooks/useWindowSize'
import MobileNavbar from './MobileNavbar'
import DesktopNavbar from './DesktopNavbar'
import useCurrentUser from '../../../hooks/useCurrentUser'

const Navbar = () => {
  const { isFetching, isFetched, isAuthenticated, role } = useCurrentUser()
  const { windowWidth: width } = useWindowSize()

  if (isFetched && isAuthenticated && role !== 'pending') {
    return (width <= 768 ? <MobileNavbar /> : <DesktopNavbar />)
  } else {
    return null;
  }
}

export default Navbar
