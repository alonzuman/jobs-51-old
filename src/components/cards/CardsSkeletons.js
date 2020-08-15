import React from 'react'
import { Skeleton } from '@material-ui/lab'
import { Card, CardContent } from '@material-ui/core'

const CardsSkeletons = () => {
  const arr = [1, 2, 3]

  return (
    <div>
      {arr.map((x, i) => <CardSkeleton key={i} />)}
    </div>
  )
}

const CardSkeleton = () => {
  const avatarStyle = {
    height: 60,
    width: 60,
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
    width: '8rem',
    margin: '0 1rem 0 1rem',
    height: '1rem'
  }

  const cardBodyStyle = {
    width: '100%'
  }

  const cardContentStyle = {
    paddingBottom: '1rem'
  }

  return (
  <Card>
    <div style={flexHeaderStyle}>
      <Skeleton style={avatarStyle} variant='circle' />
      <div>
        <Skeleton style={cardHeaderStyle1} variant='text' />
        <Skeleton style={cardHeaderStyle2} variant='text' />
      </div>
    </div>
    <CardContent style={cardContentStyle}>
      <Skeleton style={cardBodyStyle} variant='text' />
      <Skeleton style={cardBodyStyle} variant='text' />
      <Skeleton style={cardBodyStyle} variant='text' />
    </CardContent>
  </Card>
  )
}

export default CardsSkeletons
