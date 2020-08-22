import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Dialog, DialogTitle, DialogContent, IconButton, Box, Paper } from '@material-ui/core'
import { closeDialogs } from '../../actions'
import AddJob from '../forms/job/AddJob'
import EditJob from '../forms/job/EditJob'
import SignIn from '../forms/SignIn'
import SignUp from '../forms/SignUp'
import EditProfile from '../forms/EditProfile'
import Settings from '../forms/Settings'
import SavedJobs from '../dialogs/SavedJobs'
import CloseIcon from '@material-ui/icons/Close'
import ChipsWithInputFilter from '../filters/ChipsWithInputFilter'

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
  const { title, type, open } = useSelector(state => state.dialogs)
  const dispatch = useDispatch()
  const maxWidth = () => {
    switch (type) {
      case 'SignUp':
      case 'EditProfile':
      case 'Settings':
      case 'AddJob':
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

  const paperStyle = {
    backgroundColor: localStorage.getItem('theme') === 'dark' ? '#303030' : '#efefef',
    height: '100%',
  }

  const dialogStyle = {
    direction,
  }

  const dummyCategories = [
    'UX/UI', 'Photoshop', 'Web Developer', 'Design', 'Music', 'שמירה', 'Security'
  ]

  const dummyLocations = [
    'חיפה', 'תל אביב'
  ]

  const component = () => {
    switch (type) {
      case 'SignIn': return <SignIn/>
      case 'SignUp': return <SignUp/>
      case 'Settings': return <Settings/>
      case 'AddJob': return <AddJob/>
      case 'EditJob': return <EditJob/>
      case 'EditProfile': return <EditProfile />
      case 'SavedJobs': return <SavedJobs/>
      case 'CategoriesFilter': return <ChipsWithInputFilter type='categories' values={dummyCategories} />
      case 'LocationsFilter': return <ChipsWithInputFilter type='locations' values={dummyLocations} />
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
