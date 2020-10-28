import { Chip, Grid } from '@material-ui/core'
import React from 'react'

const ChipsGrid = ({ chips }) => {
  return (
    <Grid className='mt-5' container spacing={1}>
      {chips?.map((chip, index) => <Grid item key={index}><Chip size='small' color='primary' variant='outlined' label={chip}/></Grid>)}
    </Grid>
  )
}

export default ChipsGrid
