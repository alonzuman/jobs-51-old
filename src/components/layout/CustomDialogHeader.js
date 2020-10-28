import { DialogTitle, IconButton } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import CloseIcon from '@material-ui/icons/Close'
import { useSelector } from 'react-redux';

const DialogHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  border-bottom: 1px solid ${props => props.border};
`

const CustomDialogHeader = ({ title, exitButton, onClose }) => {
  const { theme } = useSelector(state => state.theme)

  return (
    <DialogHeader border={theme?.palette?.border?.strong}>
      <DialogTitle>{title}</DialogTitle>
      {exitButton && <IconButton size='small' className='ml-5' onClick={onClose}><CloseIcon /></IconButton>}
    </DialogHeader>
  )
}

export default CustomDialogHeader
