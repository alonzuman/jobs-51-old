import { Dialog } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import AddActivity from '../organisms/AddActivity'
import CustomDialogHeader from '../molecules/CustomDialogHeader'

const AddActivityDialog = ({ open, onClose }) => {
  const { translation } = useSelector(state => state.theme)

  return (
    <Dialog dir='rtl' open={open} onClose={onClose}>
      <CustomDialogHeader exitButton onClose={onClose} title={translation.addActivity} />
      <AddActivity onClose={onClose} />
    </Dialog>
  )
}

export default AddActivityDialog
