import { Dialog, DialogContent } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getConstants } from '../../actions/constants';
import SocialMediaSignIn from '../../components/forms/SocialMediaSignIn'
import CustomDialogHeader from '../../components/layout/CustomDialogHeader'

const AuthDialog = ({ open, onClose }) => {
  const { translation } = useSelector(state => state.theme)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getConstants())
  }, [])

  return (
    <Dialog dir='rtl' open={open} onClose={onClose}>
      <CustomDialogHeader exitButton onClose={onClose} title={translation.signIn} />
      <DialogContent>
        <SocialMediaSignIn />
      </DialogContent>
    </Dialog>
  )
}

export default AuthDialog
