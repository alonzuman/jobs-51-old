import React from 'react'
import { Skeleton } from '@material-ui/lab'
import { Grid } from '@material-ui/core'

const skeletonStyle = {
  height: '2rem',
  width: '4rem',
  borderRadius: '1rem'
}

const ChipsSkeleton = ({ count = 3 }) => {
  const arr = [...Array(count)]

  return (
    <Grid container spacing={1}>
      {arr.map((x, i) => <Grid key={i} item><Skeleton variant='rect' style={skeletonStyle} /></Grid>)}
    </Grid>
  )
}

export default ChipsSkeleton
