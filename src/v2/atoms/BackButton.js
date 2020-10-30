import React from 'react'
import { IconButton } from '@material-ui/core'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  position: ${props => props.sticky ? 'sticky' : 'relative'};
  top: ${props => props.sticky ? '0' : ''};
`

const BackButton = ({ sticky = true, backLink = '', ...rest }) => {
  const history = useHistory()
  const handleClick = () => {
    if (backLink) {
      return history.push(backLink)
    } else {
      return history.goBack()
    }
  }

  return (
    <Container sticky={sticky}>
      <IconButton size='small' onClick={handleClick} {...rest}>
        <KeyboardArrowRightIcon />
      </IconButton>
    </Container>
  )
}

export default BackButton
