import { Dialog } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import PersonalDetails from '../forms/profile/PersonalDetails'
import CustomDialogHeader from '../layout/CustomDialogHeader'

const PersonalDetailsContainer = ({ open, onClose }) => {
  const { translation } = useSelector(state => state.theme)

  return (
    <Dialog dir='rtl' open={open} onClose={onClose}>
      <CustomDialogHeader title='personalDetails' exitButton onClose={onClose} />
      <PersonalDetails customMsg={translation?.lookingForJobFillDetails} />
    </Dialog>
  )
}

export default PersonalDetailsContainer
