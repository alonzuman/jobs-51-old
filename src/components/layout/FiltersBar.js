import React, { useState, useEffect } from 'react'
import { Box, Chip, Grid, AppBar } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { getJobs } from '../../actions/jobs'
import BackButton from './BackButton'

const FiltersBar = ({ filters }) => {
  const [scrollPosition, setScrollPosition] = useState(0)
  const { translation, theme } = useSelector(state => state.theme)
  const dispatch = useDispatch()

  // useEffect(() => {
  //   document.addEventListener('scroll', () => setScrollPosition(window.scrollY))
  // }, [scrollPosition])

  const appBarStyle = {
    direction: 'rtl',
    display: 'flex',
    alignItems: 'center',
    padding: '.5rem 1rem',
    backgroundColor: theme.palette.background.paper,
    // boxShadow: scrollPosition > 0 ? '0 0 10px #00000025' : 'none',
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
        <Grid item><Chip style={clearStyle} onClick={() => dispatch(getJobs())} label={translation.clear} /></Grid>
        {/* <BackButton /> */}
      </Box>
    </AppBar>
  )
}

export default FiltersBar
