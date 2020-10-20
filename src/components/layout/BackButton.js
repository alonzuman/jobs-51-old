import React from 'react'
import { IconButton } from '@material-ui/core'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components'

const Container = styled.div`
  height: 40px;
  width: 40px;
`

const BackButton = () => {
  const history = useHistory()
  const handleClick = () => history.goBack()

  return (
  <Container>
    <IconButton onClick={handleClick}>
      <KeyboardArrowRightIcon />
    </IconButton>
  </Container>
  )
}

export default BackButton
