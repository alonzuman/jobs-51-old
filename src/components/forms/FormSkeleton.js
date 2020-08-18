import React from 'react'
import { Skeleton} from '@material-ui/lab'
import { Grid } from '@material-ui/core'

const FormSkeleton = () => {
  return (
    <div>
      <Skeleton variant='text' height={62} />
      <Skeleton variant='text' height={62} />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Skeleton variant='text' height={62} />
        </Grid>
        <Grid item xs={6}>
          <Skeleton variant='text' height={62} />
        </Grid>
      </Grid>
      <Skeleton variant='text' height={62} />
      <Skeleton variant='text' height={62} />
      <Skeleton variant='text' height={62} />
    </div>
  )
}

export default FormSkeleton
