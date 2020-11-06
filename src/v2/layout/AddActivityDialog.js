import { Dialog } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import AddActivity from '../organisms/AddActivity'
import CustomDialogHeader from '../molecules/CustomDialogHeader'
import AddActivityProvider from '../../contexts/AddActivityContext'

const AddActivityDialog = ({ open, onClose }) => {
  const { translation } = useSelector(state => state.theme)

  return (
    <Dialog dir='rtl' open={open} onClose={onClose}>
      <AddActivityProvider>
        <CustomDialogHeader exitButton onClose={onClose} title={translation.addActivity} />
        <AddActivity onClose={onClose} />
      </AddActivityProvider>
    </Dialog>
  )
}

export default AddActivityDialog
