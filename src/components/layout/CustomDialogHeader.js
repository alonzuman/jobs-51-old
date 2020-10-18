import { DialogTitle, IconButton, Typography } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import CloseIcon from '@material-ui/icons/Close'
import { useSelector } from 'react-redux';

const DialogHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
`

const CustomDialogHeader = ({ title, exitButton, onClose }) => {
  const { translation } = useSelector(state => state.theme)

  return (
    <DialogHeader>
      <DialogTitle>{translation[title]}</DialogTitle>
      {exitButton && <IconButton onClick={onClose}><CloseIcon /></IconButton>}
    </DialogHeader>
  )
}

export default CustomDialogHeader
