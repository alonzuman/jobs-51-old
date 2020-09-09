import React from 'react'
import TopBar from '../../components/layout/TopBar'
import { useSelector } from 'react-redux'
import PageContainer from '../../components/layout/PageContainer'
import { CSVLink, CSVDownload } from 'react-csv'
import { Table, TableHead, TableRow, TableCell, TableBody, Button, TableContainer } from '@material-ui/core'

const ExportActivities = () => {
  const { translation } = useSelector(state => state.theme)

  const data = [
    ["firstname", "lastname", "email"],
    ["Ahmed", "Tomi", "ah@smthing.co.com"],
    ["Raed", "Labes", "rl@smthing.co.com"],
    ["Yezzi", "Min l3b", "ymin@cocococo.com"]
  ];

  return (
    <>
      <TopBar backButton={true} title={translation.exportActivities} />
      <PageContainer>
        <CSVLink data={data}><Button variant='outlined' color='primary'>{translation.download}</Button></CSVLink>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {data[0].map((cell, index) => <TableCell key={index} align='right'>{cell}</TableCell>)}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => {
                if (index > 0) {
                  return (
                    <TableRow>{data[index].map((row, index) => <TableCell align='right' key={index}>{row}</TableCell>)}</TableRow>
                  )
                }
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </PageContainer>
    </>
  )
}

export default ExportActivities
