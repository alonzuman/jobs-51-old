import React from 'react'
import { Paper, Typography, Grid, Container } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import TopBar from '../components/layout/TopBar'

const Admin = () => {
  const { translation } = useSelector(state => state.theme)

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
      <TopBar title={translation.admin} />
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={6} md={4} lg={4}>
            <Link to='/admin/users'>
              <Paper elevation={0} style={actionPaperStyle}>
                <Typography variant='body1'>{translation.manageUsers}</Typography>
              </Paper>
            </Link>
          </Grid>
          <Grid item xs={6} md={4} lg={4}>
            <Link to='/admin/activities'>
              <Paper elevation={0} style={actionPaperStyle}>
                <Typography variant='body1'>{translation.manageActivities}</Typography>
              </Paper>
            </Link>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Admin
