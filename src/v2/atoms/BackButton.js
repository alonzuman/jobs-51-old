import React from 'react'
import { IconButton } from '@material-ui/core'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import useTheme from '../../hooks/useTheme';

const Container = styled.div`
  position: ${props => props.sticky ? 'sticky' : 'relative'};
  top: ${props => props.sticky ? '0' : ''};
  background-color: ${props => props.backgroundColor};
  box-shadow: ${props => props.boxShadow};
  transition: box-shadow .25s ease-in-out, background-color .25s ease-in-out;
  border-radius: 50%;
`

const BackButton = ({ sticky = true, backLink = '', isScrolling = false, ...rest }) => {
  const { theme } = useTheme();
  const history = useHistory()
  const handleClick = () => {
    if (backLink) {
      return history.push(backLink)
    } else {
      return history.goBack()
    }
  }

  return (
    <Container sticky={sticky} backgroundColor={isScrolling ? theme?.palette?.background?.light : theme?.palette?.background?.main} boxShadow={isScrolling ? '0px 4px 10px #00000015' : ''}>
      <IconButton size='small' onClick={handleClick} {...rest}>
        <KeyboardArrowRightIcon />
      </IconButton>
    </Container>
  )
}

export default BackButton
