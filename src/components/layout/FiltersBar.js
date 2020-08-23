import React from 'react'
import { Box, Chip, Grid, AppBar } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { clearGlobalFilters } from '../../actions/jobs'

const FiltersBar = ({ filterOptions }) => {
  const { filters } = useSelector(state => state.jobs)
  const { translation, theme } = useSelector(state => state.theme)
  const dispatch = useDispatch()

  const appBarStyle = {
    direction: 'rtl',
    display: 'flex',
    alignItems: 'center',
    padding: '.5rem 1rem',
    backgroundColor: theme.palette.background.paper,
    boxShadow: 'none',
    borderBottom: `1px solid ${theme.palette.background.default}`,
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
    </AppBar>
  )
}

export default FiltersBar
