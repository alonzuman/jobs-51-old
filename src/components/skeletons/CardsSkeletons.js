import React from 'react'
import { Skeleton } from '@material-ui/lab'
import { Card, CardContent, CardHeader, Grid } from '@material-ui/core'

const CardsSkeletons = ({ count }) => {
  const arr = [...Array(count || 3)]

  return (
    <Grid className='p-1' spacing={2} container >
      {arr.map((x, i) => <Grid key={i} item xs={12} md={6} lg={6}><CardSkeleton /></Grid>)}
    </Grid>
  )
}

const CardSkeleton = () => {
  return (
    <Card variant='outlined' dir='rtl'>
      <CardHeader
        avatar={<Skeleton height={40} width={40} variant='circle' />}
        title={<Skeleton width={64} height={24} />}
        subheader={<Skeleton width={104} height={18} />}
      />
      <CardContent className='pt-0 pb-5'>
        <Skeleton width={'12rem'} variant='text' />
        <Skeleton width={'8rem'} variant='text' />
      </CardContent>
    </Card>
  )
}

export default CardsSkeletons
