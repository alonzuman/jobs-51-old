import React from 'react'
import { Grid, Paper, Typography, ListItem } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import CardMarker from '../cards/CardMarker'

const StatsList = ({ items }) => {
  const statsPaperStyle = {
    width: '100%',
    height: 120,
    display: 'flex',
    borderRadius: '1rem',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  }

  return (
    <Grid className='cards__container' container spacing={2}>
      {items.map((item, index) => (
        <Grid key={index} xs={6} md={6} lg={6} item>
          <ListItem className='br-1' button>
            <Link className='full__width' to={item.link && item.link}>
              <Paper style={statsPaperStyle} elevation={0}>
                {item.marker && <CardMarker color={item.marker} />}
                <Typography variant='h1'>{item.big}</Typography>
                <Typography variant='body1'>{item.label}</Typography>
              </Paper>
            </Link>
          </ListItem>
        </Grid>
      ))}
    </Grid>
  )
}

export default StatsList
