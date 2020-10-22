import { Button, CircularProgress, Dialog, DialogContent, Typography } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import CustomDialogHeader from '../../components/layout/CustomDialogHeader'
import DialogActionsContainer from '../atoms/DialogActionsContainer'

const ApprovalDialog = ({ open, onClose, text, action, loading }) => {
  const { translation } = useSelector(state => state.theme)

  return (
    <Dialog dir='rtl' open={open} onClose={onClose}>
      <CustomDialogHeader title={translation.approveAction} onClose={onClose} exitButton />
      <DialogContent>
        <Typography variant='body1'>{text}</Typography>
      </DialogContent>
      <DialogActionsContainer border={false}>
        <Button
          disabled={loading}
          color='primary'
          onClick={onClose}
        >{translation.cancel}</Button>
        <Button
          disabled={loading}
          color='primary'
          variant='contained'
          onClick={action}
        >{loading ? <CircularProgress className='button-spinner' /> : translation.approve}</Button>
      </DialogActionsContainer>
    </Dialog>
  )
}

export default ApprovalDialog
