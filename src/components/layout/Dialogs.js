import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Dialog, DialogTitle, DialogContent, IconButton, Box, Paper } from '@material-ui/core'
import { closeDialogs } from '../../actions'
import AddJob from '../forms/job/AddJob'
import EditJob from '../forms/job/EditJob'
import SignIn from '../forms/SignIn'
import SignUp from '../forms/SignUp'
import Settings from '../forms/Settings'
import SavedJobs from '../dialogs/SavedJobs'
import AddActivity from '../forms/activity/AddActivity'
import CloseIcon from '@material-ui/icons/Close'
import SingleSelectionFilter from '../filters/SingleSelectionFilter'
import MultiSelectionFilter from '../filters/MultiSelectionFilter'

const Dialogs = () => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const { translation, direction, theme } = useSelector(state => state.theme)
  const { title, type, open } = useSelector(state => state.dialogs)
  const dispatch = useDispatch()
  const maxWidth = () => {
    switch (type) {
      case 'SignUp':
      case 'EditProfile':
      case 'Settings':
      case 'AddJob':
      case 'AddActivity':
      case 'SignIn': return 'xs'
      case 'SavedJobs':  return 'lg'
      default: return 'xs'
    }
  }

  useEffect(() => {
    if (open) {
      setDialogOpen(true)
    } else {
      setDialogOpen(false)
    }
  }, [open])


  const dialogTitleStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0',
    top: 0,
    position: 'sticky',
    backgroundColor: theme.palette.background.paper,
    zIndex: 999
  }

  const buttonStyle = {
    margin: '0 .5rem'
  }
  const paperStyle = {
    height: '100%',
  }

  const dialogStyle = {
    direction,
  }

  const component = () => {
    switch (type) {
      case 'SignIn': return <SignIn/>
      case 'SignUp': return <SignUp/>
      case 'Settings': return <Settings/>
      case 'AddActivity': return <AddActivity/>
      case 'AddJob': return <AddJob/>
      case 'EditJob': return <EditJob/>
      case 'SavedJobs': return <SavedJobs/>
      case 'CategoriesFilter': return <MultiSelectionFilter type='categories' />
      case 'LocationsFilter': return <SingleSelectionFilter type='locations' />
      case 'DatesFilter': return <SingleSelectionFilter type='dates' />
      default: return false
    }
  }

  return (
    <Dialog maxWidth={maxWidth()} fullWidth style={dialogStyle} open={dialogOpen} onClose={() => dispatch(closeDialogs())}>
      <Paper style={paperStyle}>
        <Box style={dialogTitleStyle}>
          <DialogTitle>{translation[title]}</DialogTitle>
          <IconButton style={buttonStyle} onClick={() => dispatch(closeDialogs())}>
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent>
          {component()}
        </DialogContent>
      </Paper>
    </Dialog>
  )
}

export default Dialogs
