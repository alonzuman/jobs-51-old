import React from 'react'
import { Skeleton } from '@material-ui/lab'
import { Card, CardContent, Grid } from '@material-ui/core'
import { useSelector } from 'react-redux'

const CardsSkeletons = ({ count }) => {
  const arr = [...Array(count || 3)]

  const gridStyle = {
    padding: '0 0 1rem 0'
  }

  return (
    <Grid style={gridStyle} spacing={2} container >
      {arr.map((x, i) => <CardSkeleton key={i} />)}
    </Grid>
  )
}

const CardSkeleton = () => {
  const { direction } = useSelector(state => state.theme)
  const avatarStyle = {
    height: 40,
    width: 40,
    margin: '1rem'
  }

  const flexHeaderStyle = {
    display: 'flex',
    width: '100%'
  }

  const cardHeaderStyle1 = {
    width: '8rem',
    margin: '1rem 0 .5rem 1rem',
    height: '1.3rem'
  }

  const cardHeaderStyle2 = {
    width: '6rem',
    height: '1rem'
  }

  return (
  <Grid item xs={12} md={6} lg={6}>
    <Card variant='outlined' dir='rtl'>
      <div style={flexHeaderStyle}>
        <Skeleton style={avatarStyle} variant='circle' />
        <div>
          <Skeleton style={cardHeaderStyle1} variant='text' />
          <Skeleton style={cardHeaderStyle2} variant='text' />
        </div>
      </div>
      <CardContent>
        <Skeleton width={'12rem'} variant='text' />
        <Skeleton width={'8rem'} variant='text' />
        <br />
        <Skeleton width={'10rem'} variant='text' />
      </CardContent>
    </Card>
  </Grid>
  )
}

export default CardsSkeletons
