import React from 'react'
import PageHeader from '../../components/layout/PageHeader'
import { useSelector } from 'react-redux'
import TopBar from '../../components/layout/TopBar'
import BackButton from '../../components/layout/BackButton'
import { Typography, Box } from '@material-ui/core'
import UsersList from '../../components/lists/UsersList'
import SearchBar from '../../components/filters/SearchBar'

const ManageUsers = () => {
  const { translation } = useSelector(state => state.theme)

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
    padding: '.5rem'
  }

  return (
    <>
      <TopBar>
        <Box style={boxStyle}>
          <BackButton />
          <Typography variant='h1'>{translation.manageUsers}</Typography>
        </Box>
        <Box style={filtersContainerStyle}>
          <SearchBar />
        </Box>
      </TopBar>
      <Box style={listBoxStyle}>
        <UsersList />
      </Box>
    </>
  )
}

export default ManageUsers
