import React from 'react'
import PageHeader from '../../components/layout/PageHeader'
import { useSelector } from 'react-redux'

const ManageUsers = () => {
  const { translation } = useSelector(state => state.theme)

  return (
    <>
      <PageHeader title={translation.manageUsers} backButton={true} />
    </>
  )
}

export default ManageUsers
