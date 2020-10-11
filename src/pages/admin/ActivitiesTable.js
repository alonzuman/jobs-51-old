import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CSVLink } from 'react-csv'
import { Table, TableHead, TableRow, TableCell, TableBody, Button, TableContainer, Typography } from '@material-ui/core'
import { getActivities } from '../../actions'

const ActivitiesTable = () => {
  const { translation } = useSelector(state => state.theme)
  const { filters, activities, loading } = useSelector(state => state.activities)
  const [data, setData] = useState([])
  const dispatch = useDispatch()

  const mapData = () => {
    if (activities) {
      let arrayHeaders = [
        translation['firstName'],
        translation['lastName'],
        translation['region'],
        translation['date'],
        translation['type'],
        translation['totalHours'],
        translation['status']
      ]
      let array = [arrayHeaders]
      activities.forEach(activity => {
        const { user, region, date, type, total, approved } = activity;
        array.push([
          user.firstName,
          user.lastName,
          region,
          date,
          type,
          total,
          approved ? translation.approved : translation.pending])
      })
      setData([...array])
    }
  }

  useEffect(() => { dispatch(getActivities()) }, [filters, dispatch])
  useEffect(() => { mapData() }, [activities])

  return (
    <>
      {!loading && !data[1] && <Typography variant='body1'>{translation.noDataToShow}</Typography>}
      {!loading && data.length > 1 &&
      <>
        <CSVLink data={data}><Button variant='outlined' color='primary'>{translation.download}</Button></CSVLink>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {data[0].map((cell, index) => <TableCell key={index} >{cell}</TableCell>)}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => {
                if (index > 0) {
                  return (
                    <TableRow key={index}>{data[index].map((cell, index) => <TableCell key={index}>{cell}</TableCell>)}</TableRow>
                  )
                }
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </>}
    </>
  )
}

export default ActivitiesTable
