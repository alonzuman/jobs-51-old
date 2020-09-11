import React, { useState } from 'react'
import { TextField, IconButton, Box, Grid } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import { useSelector, useDispatch } from 'react-redux';
import { addFilter, removeFilter } from '../../actions/jobs';
import CustomChip from '../cards/CustomChip';
import { setFeedback } from '../../actions';

const AddChips = ({ label, chips, setChips, collection }) => {
  const { direction } = useSelector(state => state.theme)
  const dispatch = useDispatch()
  const [chipToAdd, setChipToAdd] = useState('')

  const addChip = chip => {
    if (!chips) {
      setChips([chip])
      setChipToAdd('')
      dispatch(addFilter({ collection, value: chip }))
    } else if (!chips.includes(chip) && chipToAdd.trim().length !== 0 && chips.length <= 4) {
      setChips([...chips, chip])
      setChipToAdd('')
      dispatch(addFilter({ collection, value: chip }))
    }
  }

  const removeChip = chip => {
    setChips([...chips.filter(x => x !== chip)])
    dispatch(removeFilter({ collection, value: chip }))
  }

  const handleChipChange = e => {
    if (chipToAdd.indexOf("/") > -1) {
      dispatch(setFeedback({
        type: 'error',
        msg: 'forwardSlash'
      }))
      return setChipToAdd(chipToAdd.substring(0, chipToAdd.length - 1))
    } else {
      return setChipToAdd(e.target.value)
    }
  }


  const boxStyle = {
    display: 'flex',
    alignItems: 'center'
  }

  const gridStyle = {
    padding: '.5rem 0'
  }

  const iconButtonStyle = {
    margin: direction === 'rtl' ? '0 .5rem 0 0' : '0 0 0 .5rem'
  }

  const chipStyle = {
    direction: 'ltr',
  }

  return (
    <div>
      <Box style={boxStyle}>
        <TextField className='no-margin' value={chipToAdd} onChange={handleChipChange} label={label} variant='outlined' />
        <IconButton style={iconButtonStyle} onClick={() => addChip(chipToAdd)} ><AddIcon /></IconButton>
      </Box>
      <Grid style={gridStyle} container spacing={1}>
        {chips?.length > 0 && chips?.map((chip, index) => <Grid key={index} item><CustomChip style={chipStyle} onDelete={() => removeChip(chip)} label={chip} /></Grid>)}
      </Grid>
    </div>
  )
}

export default AddChips
