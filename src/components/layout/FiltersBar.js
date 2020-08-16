import React, { useState } from 'react'
import { Box, Chip, Grid } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { getJobs } from '../../actions/jobs'

const FiltersBar = ({ filters }) => {
  const { translation } = useSelector(state => state.theme)
  const dispatch = useDispatch()

  const boxStyle = {
    direction: 'rtl',
    display: 'flex',
    alignItems: 'center'
  }

  return (
    <Box style={boxStyle}>
      <Grid container spacing={1} container>
        {filters?.map((filter, index) =>
        <Grid key={index} item><Chip onClick={filter.onClick} className='chip-button' variant='outlined' label={filter.label} /></Grid>)}
      </Grid>
      <Grid style={{ width: 'fit-content', direction: 'ltr' }} container>
        <Grid item><Chip onClick={() => dispatch(getJobs())} label={translation.clear} /></Grid>
      </Grid>
    </Box>
  )
}

export default FiltersBar
