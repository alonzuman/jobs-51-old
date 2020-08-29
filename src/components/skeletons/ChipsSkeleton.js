import React from 'react'
import { Skeleton } from '@material-ui/lab'
import { Grid } from '@material-ui/core'

const skeletonStyle = {
  height: '2rem',
  width: '3rem',
  borderRadius: '1rem'
}

const ChipsSkeleton = () => {
  const arr = [1, 2, 3]

  return (
    <Grid container spacing={1}>
      {arr.map((x, i) => <Grid key={i} item><Skeleton variant='rect' style={skeletonStyle} /></Grid>)}
    </Grid>
  )
}

export default ChipsSkeleton
