import { DialogTitle, IconButton } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import CloseIcon from '@material-ui/icons/Close'
import { useSelector } from 'react-redux';
import useTheme from '../../hooks/useTheme';

const DialogHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  border-bottom: 1px solid ${props => props.border};
  min-height: 65px;
`

const CustomDialogHeader = ({ title, onClose }) => {
  const { theme } = useTheme();

  return (
    <DialogHeader border={theme?.palette?.border?.strong}>
      <DialogTitle>{title}</DialogTitle>
      {onClose && <IconButton size='small' className='ml-5' onClick={onClose}><CloseIcon /></IconButton>}
    </DialogHeader>
  )
}

export default CustomDialogHeader
