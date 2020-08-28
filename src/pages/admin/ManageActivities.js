import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import TopBar from '../../components/layout/TopBar'
import { Typography, Box, Container, Grid, Chip } from '@material-ui/core'
import FiltersBar from './components/FiltersBar'
import MultiSelectionChips from './components/MultiSelectionChips'
import { getActivities, clearActivityFilters } from '../../actions'
import BackButton from '../../components/layout/BackButton'
import ActivitiesList from '../../components/lists/ActivitiesList'
import SingleSelectionChips from './components/SingleSelectionChips'

const regions = ['תל אביב', 'חיפה', 'באר שבע', 'שרון', 'ירושלים']
const statuses = ['approved', 'pending']

const ManageActivities = () => {
  const { region } = useSelector(state => state.auth)
  const { filters } = useSelector(state => state.activities)
  const { translation } = useSelector(state => state.theme)
  const dispatch = useDispatch()

  const headerStyle = {
    paddingLeft: '1rem',
    paddingRight: '1rem'
  }

  const boxStyle = {
    display: 'flex',
    alignItems: 'center'
  }

  const listBoxStyle = {
    marginTop: '6.5rem',
    marginBottom: '4rem',
    padding: '1rem'
  }

  const filtersContainerStyle = {
    padding: '.5rem',
    display: 'flex',
    justifyContent: 'space-between'
  }

  return (
    <>
    <TopBar>
      <Box style={boxStyle}>
        <BackButton />
        <Typography style={headerStyle} variant='h1'>{translation.manageActivities}</Typography>
      </Box>
      <FiltersBar>
        <Box style={filtersContainerStyle}>
          <Grid container spacing={1}>
            <Grid item>
              <MultiSelectionChips filters={region ? { region } : filters.regions} type='regions' action={'SET_ACTIVITY_FILTERS'} selectedFilters={filters} label={translation.region} selections={regions} />
            </Grid>
            <Grid item>
              <SingleSelectionChips existingFilter={filters} type='status' action={'SET_ACTIVITY_FILTERS'} selectedFilters={filters} label={translation.status} selections={statuses} />
            </Grid>
          </Grid>
          <Chip label={translation.clear} onClick={() => dispatch(clearActivityFilters())} />
        </Box>
      </FiltersBar>
    </TopBar>
    <Box style={listBoxStyle}>
      <ActivitiesList type='admin' />
    </Box>
    </>
  )
}

export default ManageActivities
