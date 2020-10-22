import React from 'react'
import { Card, Grid, Typography } from '@material-ui/core'

const StatsList = ({ items }) => {
  return (
    <Grid className='cards__container' container spacing={2}>
      {items.map((item, index) => (
        <Grid key={index} xs={6} md={6} lg={6} item>
          <Card variant='outlined' className='flex align__center justify__center flex__column pt-1 pb-1'>
            <Typography variant='h1'>{item.big}</Typography>
            <Typography variant='body1'>{item.label}</Typography>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default StatsList
