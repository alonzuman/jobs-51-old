import React from 'react'
import { IconButton } from '@material-ui/core'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { useHistory } from 'react-router-dom';

const BackButton = () => {
  const history = useHistory()
  const buttonStyle = {
    height: 42,
    width: 42
  }

  return <IconButton style={buttonStyle} onClick={() => history.goBack()}><ArrowForwardIcon /></IconButton>
}

export default BackButton
