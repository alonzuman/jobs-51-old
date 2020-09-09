import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import TopBar from '../../components/layout/TopBar'
import { Box, Grid, Chip } from '@material-ui/core'
import MultiSelectionChips from './components/MultiSelectionChips'
import { clearActivityFilters, changeView } from '../../actions'
import ActivitiesList from '../../components/lists/ActivitiesList'
import SingleSelectionChips from './components/SingleSelectionChips'
import PageContainer from '../../components/layout/PageContainer'
import SecondaryBar from '../../components/layout/SecondaryBar'
import CustomChip from '../../components/cards/CustomChip'
import ToggleView from '../../components/layout/ToggleView'
import ActivitiesTable from './ActivitiesTable'

const regions = ['תל אביב', 'חיפה', 'באר שבע', 'שרון', 'ירושלים']
const statuses = ['approved', 'pending', 'all']

const ManageActivities = () => {
  const { region } = useSelector(state => state.auth)
  const { filters, view } = useSelector(state => state.activities)
  const { translation } = useSelector(state => state.theme)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!view) {
      dispatch(changeView('grid'))
    }
  }, [])

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
      <TopBar backButton={true} title={translation.manageActivities} />
      <SecondaryBar>
        <Box style={filtersContainerStyle}>
          <Grid container spacing={1}>
            <Grid item>
              <MultiSelectionChips filters={region ? { region } : filters.regions} type='regions' action={'SET_ACTIVITY_FILTERS'} label={translation.region} selections={regions} />
            </Grid>
            <Grid item>
              <SingleSelectionChips existingFilter={filters} type='status' action={'SET_ACTIVITY_FILTERS'} label={translation.status} selections={statuses} />
            </Grid>
            <Grid item>
              <ToggleView selection={view} />
            </Grid>
          </Grid>
          <CustomChip style={clearStyle} label={translation.clear} onClick={() => dispatch(clearActivityFilters())} />
        </Box>
      </SecondaryBar>
      <PageContainer>
        {view === 'grid' && <ActivitiesList type='admin' />}
        {view === 'table' && <ActivitiesTable />}
      </PageContainer>
    </>
  )
}

export default ManageActivities
