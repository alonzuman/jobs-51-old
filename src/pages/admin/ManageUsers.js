import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import TopBar from '../../components/layout/TopBar'
import { Box, Grid, Chip } from '@material-ui/core'
import UsersList from '../../components/lists/UsersList'
import SearchBar from '../../components/filters/SearchBar'
import { clearUserFilters } from '../../actions/users'
import PageContainer from '../../components/layout/PageContainer'
import SecondaryBar from '../../components/layout/SecondaryBar'
import FiltersBar from '../../components/layout/FiltersBar'

const ManageUsers = () => {
  const dispatch = useDispatch()
  const { translation } = useSelector(state => state.theme)

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
      <TopBar backButton={true} title={translation.manageUsers} />
      <SecondaryBar>
        <Box style={filtersContainerStyle}>
          <Grid container spacing={1}>
            <Grid item><SearchBar /></Grid>
          </Grid>
          <Chip style={clearStyle} onClick={() => dispatch(clearUserFilters())} label={translation.clear} />
        </Box>
      </SecondaryBar>
      <PageContainer>
        <UsersList />
      </PageContainer>
    </>
  )
}

export default ManageUsers
