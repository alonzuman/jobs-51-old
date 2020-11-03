import React from 'react'
import { Skeleton } from '@material-ui/lab'
import { Divider, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core'

const CardsSkeletons = ({ count, size, disableGutters }) => {
  const arr = [...Array(count || 3)]
  return (
    <List>
      {arr.map((x, i) => <CardSkeleton key={i} size={size} disableGutters />)}
    </List>
  )
}

const CardSkeleton = ({ size = 'small', disableGutters = false }) => {
  return (
    <>
      <ListItem disableGutters={disableGutters} alignItems='flex-start' button dir='rtl'>
        <ListItemAvatar>
          <Skeleton height={40} width={40} variant='circle' />
        </ListItemAvatar>
        <ListItemText
          primary={<Skeleton width={64} height={24} />}
          secondary={
            <>
              <Skeleton width={104} height={18} />
              {size === 'large' && <Skeleton width={104} height={18} />}
            </>
          }
        />
      </ListItem>
      <Divider />
    </>
  )
}

export default CardsSkeletons
