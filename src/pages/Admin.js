import React from 'react'
import { useSelector } from 'react-redux'
import TopBar from '../components/layout/TopBar'
import PageContainer from '../components/layout/PageContainer'
import StatsList from '../components/lists/StatsList'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import AssignmentIcon from '@material-ui/icons/Assignment';


const Admin = () => {
  const { translation } = useSelector(state => state.theme)

  const items = [
    { label: translation.manageUsers, big: <PeopleAltIcon />, link: '/admin/users' },
    { label: translation.manageActivities, big: <AssignmentIcon />, link: '/admin/activities' },
  ]

  return (
    <>
      <TopBar title={translation.admin} />
      <PageContainer>
        <StatsList items={items} />
      </PageContainer>
    </>
  )
}

export default Admin
