import React, { useState } from 'react'
import ChipsSkeleton from '../../../components/layout/ChipsSkeleton'
import { Grid, Chip, Dialog, Button, DialogTitle, IconButton, Box, DialogContent } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import CloseIcon from '@material-ui/icons/Close'

const MultiSelectionChips = ({ filters, selections, action, label, type }) => {
  const { translation } = useSelector(state => state.theme)
  const [open, setOpen] = useState(false)
  const [values, setValues] = useState(Object.values(filters))
  const dispatch = useDispatch()

  const updateValues = (selection) => {
    if (!values.includes(selection)) {
      setValues([...values, selection])
    } else {
      setValues([...values.filter(value => value !== selection)])
    }
  }

  const setFilters = () => {
    dispatch({
      type: action,
      payload: { [type]: values }
    })
    setOpen(false)
  }

  const boxStyle = {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    direction: 'rtl'
  }

  return (
    <>
      <Chip color={values.length > 0 ? 'primary' : 'default'} onClick={() => setOpen(true)} label={label} />
      <Dialog open={open} onClose={() => setOpen(false)}>
        <Box style={boxStyle}>
          <DialogTitle>
            {label}
          </DialogTitle>
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent>
          {Object.keys(selections).length === 0 && <ChipsSkeleton />}
          <Grid style={{direction: 'rtl'}} container spacing={1}>
            {selections.map((selection, index) => {
              return (
                <Grid key={index} item>
                  <Chip
                    color={values.includes(selection) ? 'primary' : 'default'}
                    name={selection}
                    label={selection}
                    onClick={() => updateValues(selection)}
                  />
                </Grid>
              )
            })}
          </Grid>
          <br />
          <Button variant='contained' color='primary' disabled={values.length <= 0} className='button-style' onClick={setFilters}>{translation.apply}</Button>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default MultiSelectionChips
