import React from 'react'
import { CircularProgress, Typography } from '@material-ui/core'

const CircularProgressWithLabel = (props) => {
  const labelStyle = {
    position: 'absolute'
  }

  const containerStyle = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    float: 'left',
    margin: '0 0 1rem 0'
  }

  return (
    <div style={containerStyle}>
      <CircularProgress variat='static' {...props} />
      <Typography style={labelStyle} variant='caption' color='textSecondary'>
        {Math.round(props.value)}%
      </Typography>
    </div>
  )
}

export default CircularProgressWithLabel
