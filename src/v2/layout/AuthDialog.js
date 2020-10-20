import { Dialog } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import SignIn from '../../components/forms/SignIn'
import CustomDialogHeader from '../../components/layout/CustomDialogHeader'

const AuthDialog = ({ open, onClose }) => {
  const { translation } = useSelector(state => state.theme)

  return (
    <Dialog dir='rtl' open={open} onClose={onClose}>
      <CustomDialogHeader exitButton onClose={onClose} title={translation.signIn} />
      <SignIn />
    </Dialog>
  )
}

export default AuthDialog
