import React, { useState } from 'react'
import { TextField, Button, Box, Popover, Dialog } from '@material-ui/core'
import { setUserFilters } from '../../actions/users'
import { useDispatch, useSelector } from 'react-redux'
import CustomChip from '../cards/CustomChip'

const SearchBar = () => {
  const { translation } = useSelector(state => state.theme)
  const { filters } = useSelector(state => state.users)
  const [value, setValue] = useState('')
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch()

  const open = Boolean(anchorEl)

  const handleOpen = e => {
    setAnchorEl(e.currentTarget)
  }

  const handleClose = e => {
    setAnchorEl(null)
  }

  const handleChange = async e => {
    setValue(e.target.value)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    dispatch(setUserFilters({ 'search': value }))
    handleClose()
  }

  const boxStyle = {
    display: 'flex',
    alignItems: 'baseline',
    margin: '0 1rem',
    direction: 'rtl'
  }

  return (
    <>
    <CustomChip color={(open || filters.search) ? 'primary' : 'default'} onClick={handleOpen} label={translation.search} />
    <Popover  anchorEl={anchorEl} open={open} onClose={handleClose}>
      <Box style={boxStyle}>
        <TextField placeholder={translation.enterFirstName} value={value} onChange={handleChange} />
        <Button color='primary' onClick={handleSubmit}>{translation.search}</Button>
      </Box>
    </Popover>
    </>
  )
}

export default SearchBar
