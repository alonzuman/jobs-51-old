import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CSVLink } from 'react-csv'
import { Table, TableHead, TableRow, TableCell, TableBody, Button, TableContainer, Typography } from '@material-ui/core'

const UsersTable = ({ users, loading }) => {
  const { translation } = useSelector(state => state.theme)
  const [data, setData] = useState([])
  const dispatch = useDispatch()

  const mapData = () => {
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
      setData([...array])
    }
  }

  useEffect(() => { mapData() }, [users])

  return (
    <>
      <CSVLink data={data}><Button variant='outlined' color='primary'>{translation.download}</Button></CSVLink>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {data[0]?.map((cell, index) => <TableCell key={index} >{cell}</TableCell>)}
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
    </>
  )
}

export default UsersTable
