import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import TopBar from '../../components/layout/TopBar'
import { Box, Grid } from '@material-ui/core'
import UsersList from '../../components/lists/UsersList'
import SearchBar from '../../components/filters/SearchBar'
import { clearUserFilters } from '../../actions/users'
import PageContainer from '../../components/layout/PageContainer'
import SecondaryBar from '../../components/layout/SecondaryBar'
import SingleSelectionChips from './components/SingleSelectionChips'
import CustomChip from '../../components/cards/CustomChip'
import styled from 'styled-components'

const statuses = ['pending', 'user', 'volunteer', 'manager', 'moderator', 'admin']

const FiltersContainer = styled.div`
  padding: 8px 16px;
  display: flex;
  width: 100%;
  justify-content: space-between;
`

const ManageUsers = () => {
  const dispatch = useDispatch()
  const { translation } = useSelector(state => state.theme)
  const { filters } = useSelector(state => state.users)

  const clearStyle = {
    backgroundColor: 'transparent',
    border: 'none'
  }

  return (
    <>
      <TopBar backButton={true} title={translation.manageUsers} />
      <SecondaryBar>
        <FiltersContainer>
          <Grid container spacing={1}>
            <Grid item><SearchBar /></Grid>
            <Grid item>
              <SingleSelectionChips
                type={'status'}
                action={'SET_USERS_FILTER'}
                existingFilter={filters}
                label={translation.userStatus}
                selections={statuses}
              />
            </Grid>
          </Grid>
          <CustomChip style={clearStyle} onClick={() => dispatch(clearUserFilters())} label={translation.clear} />
        </FiltersContainer>
      </SecondaryBar>
      <PageContainer>
        <UsersList />
      </PageContainer>
    </>
  )
}

export default ManageUsers
