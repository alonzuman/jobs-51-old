import React from 'react'
import { Typography } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import AddIcon from '@material-ui/icons/Add'
import { openDialog } from '../actions/dialogs'
import ActivitiesList from '../components/lists/ActivitiesList'
import TopBar from '../components/layout/TopBar'
import FloatingActionButton from '../components/layout/FloatingActionButton'
import PageContainer from '../components/layout/PageContainer'
import StatsList from '../components/lists/StatsList'

const Activity = () => {
  const dispatch = useDispatch()
  const { translation } = useSelector(state => state.theme)
  const { pending, approved } = useSelector(state => state.auth).activities

  const statsListItems = [
    { label: translation.approved, big: approved.toFixed(1), marker: "#4caf50" },
    { label: translation.pending, big: pending.toFixed(1), marker: "#e15757" },
  ];

  return (
    <>
      <FloatingActionButton color='primary' action={() => dispatch(openDialog({ type: 'AddActivity', title: 'addActivity' }))} title={translation.addActivity}>
        <AddIcon />
      </FloatingActionButton>
      <TopBar title={translation.activity} />
      <PageContainer>
        <Typography variant='h3'>{translation.totalActivities}</Typography>
        <StatsList items={statsListItems} />
        <Typography variant='h3'>{translation.latestActivities}</Typography>
        <ActivitiesList type='personal' />
      </PageContainer>
    </>
  )
}

export default Activity
