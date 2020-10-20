import React from 'react'
import { IconButton } from '@material-ui/core'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { useHistory } from 'react-router-dom';
import './BackButton.css'

const BackButton = () => {
  const history = useHistory()
  return <IconButton className='back_button__container' onClick={() => history.goBack()}><KeyboardArrowRightIcon /></IconButton>
}

export default BackButton
