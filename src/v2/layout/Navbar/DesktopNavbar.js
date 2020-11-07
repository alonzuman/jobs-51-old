import React, { useState } from 'react'
import MenuIcon from '@material-ui/icons/Menu';
import { useSelector } from 'react-redux';
import { Avatar, Badge, Button } from '@material-ui/core';
import styled from 'styled-components';
import DesktopNavbarMenu from './DesktopNavbarMenu';

const Container = styled.div`
  top: 0;
  position: sticky;
  width: 100%;
  z-index: 9;
  direction: ltr;
  background-color: ${props => props.backgroundColor};
`

const Wrapper = styled.div`
  max-width: 1024px;
  margin: 0 auto;
`

const DesktopNavbar = ({ value }) => {
  const { avatar, uid } = useSelector(state => state.auth)
  const [anchorEl, setAnchorEl] = useState(null)
  const [hover, setHover] = useState(false)
  const { theme } = useSelector(state => state.theme)
  const { unseen } = useSelector(state => state.notifications);

  const handleHover = () => setHover(!hover)
  const handleMenuClose = () => setAnchorEl(null)
  const handleMenuOpen = e => setAnchorEl(e.currentTarget)

  const menuButtonStyle = {
    borderRadius: '2rem',
    backgroundColor: hover ? theme.palette.background.dark : theme.palette.background.paper,
    margin: '.5rem',
    zIndex: 1101
  }

  const badgeAnchorOrigin = {
    horizontal: 'left',
    vertical: 'top'
  }

  return (
    <Container backgroundColor={theme?.palette?.background?.paper}>
      <Wrapper>
        <Button onClick={handleMenuOpen} onMouseEnter={handleHover} onMouseLeave={handleHover} style={menuButtonStyle}>
          <MenuIcon className='mr-25' />
          <Badge anchorOrigin={badgeAnchorOrigin} badgeContent={unseen?.length} color='error'>
            <Avatar className='avatar__xs' src={avatar ? avatar : ''} />
          </Badge>
        </Button>
        <DesktopNavbarMenu uid={uid} handleMenuClose={handleMenuClose} value={value} anchorEl={anchorEl} />
      </Wrapper>
    </Container>
  )
}

export default DesktopNavbar
