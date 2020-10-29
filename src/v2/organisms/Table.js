import React from 'react'
import { useSelector } from 'react-redux'
import { CSVLink } from 'react-csv'
import { Table, TableHead, TableRow, TableCell, TableBody, Button, TableContainer, Typography, CircularProgress } from '@material-ui/core'
import Container from '../../v2/atoms/Container'

const UsersTable = ({ data, loading }) => {
  const { translation } = useSelector(state => state.theme)

  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    )
  } else if (!loading && data?.length !== 0) {
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
  } else {
    return (
      <Container>
        <Typography variant='body1'>{translation.noDataToShow}</Typography>
      </Container>
    )
  }
}

export default UsersTable
