import React from 'react'
import { Box, Chip, Grid, AppBar } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { clearGlobalFilters } from '../../actions/jobs'

const FiltersBar = ({ filterOptions }) => {
  const { filters } = useSelector(state => state.jobs)
  const { translation, theme } = useSelector(state => state.theme)
  const dispatch = useDispatch()

  const containerStyle = {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    padding: '.5rem 1rem'
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
    <div style={containerStyle}>
      <Box style={boxStyle}>
        <Grid style={gridStyle} spacing={1} container>
          {filterOptions?.map((filter, index) =>
          <Grid key={index} item>
            <Chip
              color={(filters && filters[filter.type]) ? 'primary' : 'default'}
              onClick={filter.onClick}
              label={filter.label}
            />
          </Grid>)}
        </Grid>
        <Grid item><Chip style={clearStyle} onClick={() => dispatch(clearGlobalFilters())} label={translation.clear} /></Grid>
      </Box>
    </div>
  )
}

export default FiltersBar
