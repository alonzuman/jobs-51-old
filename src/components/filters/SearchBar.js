import React, { useState } from 'react'
import { TextField, Button, Box, Popover, Dialog, DialogContent, DialogTitle, IconButton } from '@material-ui/core'
import { setUserFilters } from '../../actions/users'
import { useDispatch, useSelector } from 'react-redux'
import CustomChip from '../cards/CustomChip'
import CloseIcon from "@material-ui/icons/Close";

const SearchBar = () => {
  const { translation, theme } = useSelector(state => state.theme)
  const { filters } = useSelector(state => state.users)
  const [value, setValue] = useState('')
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleChange = async e => setValue(e.target.value)

  const handleSubmit = async e => {
    e.preventDefault()
    dispatch(setUserFilters({ 'search': value }))
    handleClose()
  }

  const boxStyle = {
    display: 'flex',
    alignItems: 'baseline',
    direction: 'rtl'
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

  const buttonStyle = {
    margin: "0 .5rem",
  };

  return (
    <>
      <CustomChip
        color={open || filters.search ? "primary" : "default"}
        onClick={handleOpen}
        label={translation.search}
      />
      <Dialog maxWidth={'xs'} open={open} onClose={() => setOpen(false)}>
        <Box style={dialogTitleStyle}>
          <DialogTitle>{translation.search}</DialogTitle>
          <IconButton style={buttonStyle} onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent>
          <Box style={boxStyle}>
            <TextField
              placeholder={translation.enterFirstName}
              value={value}
              onChange={handleChange}
            />
            <Button color="primary" onClick={handleSubmit}>
              {translation.search}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default SearchBar
