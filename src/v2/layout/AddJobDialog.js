import { Dialog, DialogContent } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import AddJob from '../../components/forms/job/AddJob'
import CustomDialogHeader from '../../components/layout/CustomDialogHeader'

const AddJobDialog = ({ open, onClose }) => {
  const { translation } = useSelector(state => state.theme)

  return (
    <Dialog fullWidth dir='rtl' open={open} onClose={onClose}>
      <CustomDialogHeader exitButton onClose={onClose} title={translation.addJob} />
      <AddJob onClose={onClose} />
    </Dialog>
  )
}

export default AddJobDialog
