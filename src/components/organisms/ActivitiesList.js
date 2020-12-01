import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Typography, Grid, List } from '@material-ui/core'
import ActivityCard from '../molecules/ActivityCard'
import CardsSkeletons from './CardsSkeletons'
import Table from '../organisms/Table'

const ActivitiesList = ({ activities, loading, showUser = false, view = 'list' }) => {
  const { translation } = useSelector(state => state.theme)
  const [tableData, setTableData] = useState([])

  const mapTableData = () => {
    if (activities) {
      let arrayHeaders = [
        translation['username'],
        translation['region'],
        translation['type'],
        translation['description'],
        translation['totalHours'],
        translation['approved'],
        translation['date'],
      ]
      let array = [arrayHeaders]
      activities.forEach(activity => {
        const { user, region, total, approved, type, date, description } = activity;
        const { firstName, lastName } = user;
        array.push([
          `${firstName} ${lastName}`,
          region,
          type,
          description,
          total,
          approved ? translation.yes : translation.no,
          date,
        ])
      })
      setTableData([...array])
    }
  }

  useEffect(() => {
    mapTableData()
  }, [activities])

  if (loading) {
    return <CardsSkeletons size='large' count={1} disableGutters />
  } else if (!loading && activities?.length !== 0) {
    if (view === 'list') {
      return (
        <List>
          {activities?.map((activity, index) => (
            <ActivityCard key={index} showUser={showUser} activity={activity} />)
          )}
        </List>
      )
    } else {
      return (
        <Table
          data={tableData}
          loading={loading}
        />
      )
    }
  } else {
    return <Typography variant='body1'>{translation.activitiesEmptyState}</Typography>
  }
}

export default ActivitiesList
