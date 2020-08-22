import React from 'react'
import { Box, Chip, Grid, AppBar } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { getJobs, clearGlobalFilters } from '../../actions/jobs'
import BackButton from './BackButton'

const FiltersBar = ({ filters }) => {
  const { translation, theme } = useSelector(state => state.theme)
  const dispatch = useDispatch()

  const appBarStyle = {
    direction: 'rtl',
    display: 'flex',
    alignItems: 'center',
    padding: '.5rem 1rem',
    backgroundColor: theme.palette.background.paper,
    boxShadow:  '0 0 10px #00000025',
    transition: 'box-shadow .5s ease-in-out'
  }

  const boxStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%'
  }

  const clearStyle = {
    backgroundColor: 'transparent',
    border: 'none'
  }

  const gridStyle = {
    display: 'flex',
    alignItems: 'center'
  }

  return (
    <AppBar style={appBarStyle}>
      <Box style={boxStyle}>
        <Grid style={gridStyle} spacing={1} container>
          {filters?.map((filter, index) =>
          <Grid key={index} item><Chip onClick={filter.onClick} className='chip-button' variant='outlined' label={filter.label} /></Grid>)}
        </Grid>
        <Grid item><Chip style={clearStyle} onClick={() => dispatch(clearGlobalFilters())} label={translation.clear} /></Grid>
      </Box>
    </AppBar>
  )
}

export default FiltersBar
