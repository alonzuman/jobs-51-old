import React, { useState } from 'react'
import MenuIcon from '@material-ui/icons/Menu';
import { useSelector } from 'react-redux';
import { Avatar, Button } from '@material-ui/core';
import styled from 'styled-components';
import PopperMenu from './PopperMenu';

const Container = styled.div`
  top: 0;
  position: sticky;
  width: 100%;
  z-index: 9;
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

  const handleHover = () => setHover(!hover)
  const handleMenuClose = () => setAnchorEl(null)
  const handleMenuOpen = e => setAnchorEl(e.currentTarget)

  const menuButtonStyle = {
    borderRadius: '2rem',
    backgroundColor: hover ? theme.palette.background.dark : theme.palette.background.paper,
    margin: '.5rem',
    zIndex: 1101
  }

  return (
    <Container backgroundColor={theme?.palette?.background?.paper}>
      <Wrapper>
        <Button onClick={handleMenuOpen} onMouseEnter={handleHover} onMouseLeave={handleHover} style={menuButtonStyle}>
          <MenuIcon className='mr-25' />
          <Avatar className='avatar__xs' src={avatar ? avatar : ''} />
        </Button>
        <PopperMenu uid={uid} handleMenuClose={handleMenuClose} value={value} anchorEl={anchorEl} />
      </Wrapper>
    </Container>
  )
}

export default DesktopNavbar
