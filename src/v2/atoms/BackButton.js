import React from 'react'
import { IconButton } from '@material-ui/core'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { useHistory } from 'react-router-dom';

const BackButton = ({ backLink = '', ...rest }) => {
  const history = useHistory()
  const handleClick = () => {
    if (backLink) {
      return history.push(backLink)
    } else {
      return history.goBack()
    }
  }

  return (
    <IconButton size='small' onClick={handleClick} {...rest}>
      <KeyboardArrowRightIcon />
    </IconButton>
  )
}

export default BackButton
