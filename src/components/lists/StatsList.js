import React from 'react'
import { Grid, Paper, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const StatsList = ({ items }) => {
  const { theme } = useSelector(state => state.theme)

  const statsPaperStyle = {
    width: '100%',
    height: 120,
    display: 'flex',
    borderRadius: '1rem',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    border: `1px solid ${theme.palette.border.main}`
  }

  return (
    <Grid container spacing={2}>
      {items.map((item, index) => (
        <Grid key={index} xs={6} md={6} lg={6} item>
          <Link to={item.link}>
            <Paper style={statsPaperStyle} elevation={0}>
              <Typography variant='h1'>{item.big}</Typography>
              <Typography variant='body1'>{item.label}</Typography>
            </Paper>
          </Link>
        </Grid>
      ))}
    </Grid>
  )
}

export default StatsList
