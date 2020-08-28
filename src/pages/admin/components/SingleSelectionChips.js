import React, { useEffect, useState } from 'react'
import { Chip, Dialog, Box, DialogTitle, IconButton, DialogContent, Grid, Button } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import ChipsSkeleton from '../../../components/layout/ChipsSkeleton'
import { useDispatch, useSelector } from 'react-redux'

const SingleSelectionChips = ({ existingFilter, action, selections, label, type }) => {
  const { translation } = useSelector(state => state.theme)
  const [filter, setFilter] = useState(existingFilter[type])
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()

  const updateFilter = () => {
    dispatch({
      type: action,
      payload: { [type]: filter }
    })
    setOpen(false)
  }

  useEffect(() => {
    setFilter(existingFilter[type])
  }, [existingFilter, type])

  const boxStyle = {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    direction: 'rtl'
  }

  return (
    <>
      <Chip color={filter ? 'primary' : 'default'} onClick={() => setOpen(true)} label={label} />
      <Dialog open={open} onClose={() => setOpen(false)}>
        <Box style={boxStyle}>
          <DialogTitle>
            {label}
          </DialogTitle>
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent style={{minWidth: 'fit-content'}}>
          {Object.keys(selections).length === 0 && <ChipsSkeleton />}
          <Grid style={{ direction: 'rtl' }} container spacing={1}>
            {selections.map((selection, index) => {
              return (
                <Grid key={index} item>
                  <Chip
                    color={filter === selection ? 'primary' : 'default'}
                    label={translation[selection]}
                    onClick={() => setFilter(selection)}
                  />
                </Grid>
              )
            })}
          </Grid>
          <br />
          <Button variant='contained' color='primary' disabled={!filter} className='button-style' onClick={updateFilter}>{translation.apply}</Button>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default SingleSelectionChips
