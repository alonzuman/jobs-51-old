import React, { useState } from 'react'
import { TextField, Button, Box, Chip } from '@material-ui/core'
import { setUserFilters } from '../../actions/users'
import { useDispatch, useSelector } from 'react-redux'
import CustomChip from '../cards/CustomChip'

const SearchBar = () => {
  const { translation } = useSelector(state => state.theme)
  const { filters } = useSelector(state => state.users)
  const [value, setValue] = useState('')
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()

  const handleChange = async e => {
    setValue(e.target.value)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    dispatch(setUserFilters({ 'search': value }))
    setOpen(false)
  }

  const boxStyle = {
    display: 'flex',
    alignItems: 'baseline'
  }

  const formStyle = {
    margin: '.5rem 0 0 0'
  }

  return (
    <>
    <CustomChip color={(open || filters.search) ? 'primary' : 'default'} onClick={() => setOpen(!open)} label={translation.search} />
    {open &&
    <form style={formStyle} onSubmit={handleSubmit}>
      <Box style={boxStyle}>
        <TextField value={value} onChange={handleChange} />
        <Button color='primary' type='submit'>{translation.search}</Button>
      </Box>
    </form>}
    </>
  )
}

export default SearchBar
