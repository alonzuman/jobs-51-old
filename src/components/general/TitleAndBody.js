import React from 'react'
import { Typography } from '@material-ui/core'

const TitleAndBody = ({ title, body }) => {
  return (
    <>
      <Typography variant='subtitle1'>{title}</Typography>
      <Typography variant='body1'>{body}</Typography>
    </>
  )
}

export default TitleAndBody
