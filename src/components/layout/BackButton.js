import React from 'react'
import { IconButton } from '@material-ui/core'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { useHistory } from 'react-router-dom';

const BackButton = () => {
  const history = useHistory()

  const buttonStyle = {
    margin: '0 0 0 .5rem'
  }

  return <IconButton style={buttonStyle} onClick={() => history.goBack()}><ArrowForwardIcon /></IconButton>
}

export default BackButton
