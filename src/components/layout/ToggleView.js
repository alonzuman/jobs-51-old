import React, { useState } from 'react'
import CustomChip from '../cards/CustomChip'
import { useSelector, useDispatch } from 'react-redux'
import { Dialog, DialogTitle, IconButton, Button, Grid, DialogContent } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { changeView } from '../../actions'

const options = ['table', 'grid']

const ToggleView = ({ selection }) => {
  const { translation, theme } = useSelector(state => state.theme)
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()

  const handleClick = e => {
    dispatch(changeView(e))
    setOpen(false)
  }

  const dialogTitleStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0",
    top: 0,
    position: "sticky",
    direction: 'rtl',
    backgroundColor: theme.palette.background.paper,
    zIndex: 999,
  };

  return (
    <div>
      <CustomChip color={'primary'} onClick={() => setOpen(true)} label={translation.displaySettings} />
      <Dialog open={open} onClose={() => setOpen(false)}>
        <div style={dialogTitleStyle}>
          <DialogTitle>{translation.displaySettings}</DialogTitle>
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </div>
        <DialogContent>
          <Grid style={{ justifyContent: 'flex-end' }} container spacing={1}>
            {options?.map((option, index) => <Grid item key={index}><CustomChip onClick={() => handleClick(option)} color={selection === option ? 'primary' : 'default'} label={translation[option]} /></Grid>)}
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ToggleView
