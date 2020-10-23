import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Dialog, DialogTitle, DialogContent, IconButton, Box, Paper } from '@material-ui/core'
import { closeDialogs } from '../../actions'
import AddJob from '../forms/job/AddJob'
import SignIn from '../forms/SignIn'
import SignUp from '../forms/SignUp'
import AddActivity from '../forms/activity/AddActivity'
import CloseIcon from '@material-ui/icons/Close'

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
      case 'AddActivity': return <AddActivity/>
      case 'AddJob': return <AddJob/>
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
