import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Dialog, DialogTitle, DialogContent, IconButton, Box } from '@material-ui/core'
import { closeDialogs } from '../../actions'
import AddJob from '../forms/AddJob'
import EditJob from '../forms/EditJob'
import SignIn from '../forms/SignIn'
import SignUp from '../forms/SignUp'
import EditProfile from '../forms/EditProfile'
import Settings from '../forms/Settings'
import LocationFilter from '../filters/LocationFilter'
import JobTypeFilter from '../filters/JobTypeFilter'
import DatesFilter from '../filters/DatesFilter'
import SavedJobs from '../dialogs/SavedJobs'
import CloseIcon from '@material-ui/icons/Close'

const dialogTitleStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0'
}

const buttonStyle = {
  margin: '0 .5rem'
}

const Dialogs = () => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const { translation, direction } = useSelector(state => state.theme)
  const {
    signingIn,
    signingUp,
    editingProfile,
    settings,
    addingJob,
    editingJob,
    datesFilter,
    jobTypeFilter,
    locationFilter,
    savedJobs
  } = useSelector(state => state.dialogs)
  const dispatch = useDispatch()
  const maxWidth = () => {
    switch (true) {
      case (signingIn || signingUp || editingProfile || settings || addingJob): return 'xs'
      case (savedJobs):  return 'lg'
      default: return 'xs'
    }
  }


  useEffect(() => {
    if (
      signingIn === true ||
      signingUp === true ||
      editingProfile === true ||
      settings === true ||
      addingJob === true ||
      editingJob === true ||
      datesFilter === true ||
      jobTypeFilter === true ||
      locationFilter === true ||
      savedJobs === true
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
    editingJob,
    datesFilter,
    jobTypeFilter,
    locationFilter,
    savedJobs
  ])

  return (
    <Dialog maxWidth={maxWidth()} fullWidth style={{ direction, width: '100%' }} open={dialogOpen} onClose={() => dispatch(closeDialogs())}>
      <Box style={dialogTitleStyle}>
        <DialogTitle>
          {addingJob && translation.addJob}
          {signingIn && translation.signIn}
          {signingUp && translation.signUp}
          {editingProfile && translation.editingProfile}
          {editingJob && translation.editJob}
          {settings && translation.settings}
          {datesFilter && translation.datePosted}
          {jobTypeFilter && translation.type}
          {locationFilter && translation.location}
          {savedJobs && translation.savedJobs}
        </DialogTitle>
        <IconButton style={buttonStyle} onClick={() => dispatch(closeDialogs())}>
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent>
        {signingIn && <SignIn />}
        {signingUp && <SignUp />}
        {editingProfile && <EditProfile />}
        {settings && <Settings />}
        {addingJob && <AddJob />}
        {editingJob && <EditJob />}
        {datesFilter && <DatesFilter />}
        {jobTypeFilter && <JobTypeFilter />}
        {locationFilter && <LocationFilter />}
        {savedJobs && <SavedJobs />}
      </DialogContent>
    </Dialog>
  )
}

export default Dialogs
