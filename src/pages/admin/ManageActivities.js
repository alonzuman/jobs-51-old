import React from 'react'
import PageHeader from '../../components/layout/PageHeader'
import { useSelector } from 'react-redux'

const ManageActivities = () => {
  const { translation } = useSelector(state => state.theme)

  return (
    <>
      <PageHeader title={translation.manageActivities} backButton={true} />
    </>
  )
}

export default ManageActivities
