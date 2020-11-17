import { Dialog } from '@material-ui/core'
import React from 'react'
import AddActivity from '../organisms/AddActivity'
import CustomDialogHeader from '../molecules/CustomDialogHeader'
import AddActivityProvider from '../../contexts/AddActivityContext'
import useTheme from '../../hooks/useTheme'

const AddActivityDialog = ({ open, onClose }) => {
  const { translation } = useTheme();

  return (
    <Dialog dir='rtl' open={open} onClose={onClose}>
      <AddActivityProvider onClose={onClose}>
        <CustomDialogHeader exitButton onClose={onClose} title={translation.addActivity} />
        <AddActivity onClose={onClose} />
      </AddActivityProvider>
    </Dialog>
  )
}

export default AddActivityDialog
