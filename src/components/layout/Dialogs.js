import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core'
import { closeDialogs } from '../../actions'
import AddJob from '../forms/AddJob'
import EditJob from '../forms/EditJob'

const Dialogs = () => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const { translation } = useSelector(state => state.theme)
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
    <Dialog open={dialogOpen} onClose={() => dispatch(closeDialogs())}>
      <DialogTitle>
        {addingJob && translation.addJob}
        {signingIn && translation.signIn}
        {editingJob && translation.editJob}
      </DialogTitle>
      <DialogContent>
        {signingIn && <h1>signing in</h1>}
        {signingUp && <h1>signing in</h1>}
        {editingProfile && <h1>signing in</h1>}
        {settings && <h1>signing in</h1>}
        {addingJob && <AddJob />}
        {editingJob && <EditJob />}
      </DialogContent>
    </Dialog>
  )
}

export default Dialogs
