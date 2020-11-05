import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { List, Typography } from '@material-ui/core'
import UserCard from '../molecules/UserCard'
import CardsSkeletons from './CardsSkeletons'
import Table from '../organisms/Table'

const UsersList = ({ loading, users, view = 'list' }) => {
  const [tableData, setTableData] = useState([])
  const { translation } = useSelector(state => state.theme)

  const mapTableData = () => {
    if (users) {
      let arrayHeaders = [
        translation['firstName'],
        translation['lastName'],
        translation['region'],
        translation['hometown'],
        translation['approved'],
        translation['pending'],
      ]
      let array = [arrayHeaders]
      users.forEach(user => {
        const { firstName, lastName, activities, region, hometown } = user;
        array.push([
          firstName,
          lastName,
          region,
          hometown,
          activities.approved,
          activities.pending
        ])
      })
      setTableData([...array])
    }
  }

  useEffect(() => {
    mapTableData()
  }, [users])

  if (loading) {
    return <CardsSkeletons disableGutters count={1} size='small' className='p-0' />
  } else if (!loading && users?.length !== 0) {
    if (view === 'list') {
      return (
        <List>
          {users?.map((user, index) => <UserCard key={index} user={user} />)}
        </List>
      )
    } else if (view === 'table') {
      return (
        <Table
          data={tableData}
          loading={loading}
        />
      )
    }
  } else {
    return <Typography variant='body1'>{translation.usersEmptyState}</Typography>
  }
}

export default UsersList
