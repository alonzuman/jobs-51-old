import React from 'react'
import { Dialog, DialogContent, DialogActions, Button, Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'

const ApprovalBox = ({ open, setOpen, action, text }) => {
  const { translation, direction } = useSelector(state => state.theme)
  return (
    <Dialog style={{direction}} open={open} onClose={() => setOpen(false)}>
      <DialogContent>
        <br/>
        <Typography variant='body1'>{text}</Typography>
      </DialogContent>
      <DialogActions >
        <Button color='primary' variant='contained' onClick={action}>{translation.approve}</Button>
        <Button color='primary' variant='outlined' onClick={() => setOpen(false)}>{translation.cancel}</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ApprovalBox
