import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core'
import { closeDialogs } from '../../actions'
import AddJob from '../forms/AddJob'
import EditJob from '../forms/EditJob'
import SignIn from '../forms/SignIn'
import SignUp from '../forms/SignUp'
import EditProfile from '../forms/EditProfile'
import Settings from '../forms/Settings'

const Dialogs = () => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const { translation, direction } = useSelector(state => state.theme)
  const {
    signingIn,
    signingUp,
    editingProfile,
    settings,
    addingJob,
    editingJob
  } = useSelector(state => state.dialogs)
  const dispatch = useDispatch()

  useEffect(() => {
    if (
      signingIn === true ||
      signingUp === true ||
      editingProfile === true ||
      settings === true ||
      addingJob === true ||
      editingJob === true
    ) {
      setDialogOpen(true)
    } else {
      setDialogOpen(false)
    }
  }, [
    signingIn,
    signingUp,
    editingProfile,
    settings,
    addingJob,
    editingJob
  ])

  return (
    <Dialog style={{ direction }} open={dialogOpen} onClose={() => dispatch(closeDialogs())}>
      <DialogTitle>
        {addingJob && translation.addJob}
        {signingIn && translation.signIn}
        {editingJob && translation.editJob}
      </DialogTitle>
      <DialogContent>
        {signingIn && <SignIn />}
        {signingUp && <SignUp />}
        {editingProfile && <EditProfile />}
        {settings && <Settings />}
        {addingJob && <AddJob />}
        {editingJob && <EditJob />}
      </DialogContent>
    </Dialog>
  )
}

export default Dialogs
