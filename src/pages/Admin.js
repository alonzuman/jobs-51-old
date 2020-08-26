import React from 'react'
import { Paper, Typography, Box, Grid } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import PageHeader from '../components/layout/PageHeader'

const Admin = () => {
  const { translation } = useSelector(state => state.theme)

  const boxStyle = {
    padding: '1rem'
  }

  const actionPaperStyle = {
    width: '100%',
    height: 120,
    display: 'flex',
    borderRadius: '1rem',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  }

  return (
    <>
      <PageHeader title={translation.admin} />
      <Box style={boxStyle}>
        <Grid container spacing={2}>
          <Grid item xs={6} md={4} lg={4}>
            <Link to='/admin/users'>
              <Paper style={actionPaperStyle}>
                Users
              </Paper>
            </Link>
          </Grid>
          <Grid item xs={6} md={4} lg={4}>
            <Link to='/admin/activities'>
              <Paper style={actionPaperStyle}>
                Activities
              </Paper>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default Admin
