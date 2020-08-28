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

  const listBoxStyle = {
    padding: '1rem'
  }

  const filtersContainerStyle = {
    padding: '.5rem 1rem',
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between'
  }

  const clearStyle = {
    backgroundColor: 'transparent',
    border: 'none'
  }

  return (
    <>
    <TopBar backButton={true} title={translation.manageActivities}>
      <Box style={filtersContainerStyle}>
        <Grid container spacing={1}>
          <Grid item>
            <MultiSelectionChips filters={region ? { region } : filters.regions} type='regions' action={'SET_ACTIVITY_FILTERS'} selectedFilters={filters} label={translation.region} selections={regions} />
          </Grid>
          <Grid item>
            <SingleSelectionChips existingFilter={filters} type='status' action={'SET_ACTIVITY_FILTERS'} selectedFilters={filters} label={translation.status} selections={statuses} />
          </Grid>
        </Grid>
        <Chip style={clearStyle} label={translation.clear} onClick={() => dispatch(clearActivityFilters())} />
      </Box>
    </TopBar>
    <Container>
      <ActivitiesList type='admin' />
    </Container>
    </>
  )
}

export default ManageActivities
