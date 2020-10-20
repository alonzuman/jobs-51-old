import { Dialog, DialogContent } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import AddActivity from '../../components/forms/activity/AddActivity'
import CustomDialogHeader from '../../components/layout/CustomDialogHeader'

const AddActivityDialog = ({ open, onClose }) => {
  const { translation } = useSelector(state => state.theme)

  return (
    <Dialog dir='rtl' open={open} onClose={onClose}>
      <CustomDialogHeader exitButton onClose={onClose} title={translation.addActivity} />
      <AddActivity />
    </Dialog>
  )
}

export default AddActivityDialog
