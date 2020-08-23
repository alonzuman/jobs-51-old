import React from 'react'
import { CircularProgress, Container } from '@material-ui/core'

const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '75vh'
}

const CircularSpinnerWithContainer = () => {
  return (
    <Container style={containerStyle}>
      <CircularProgress />
    </Container>
  )
}

export default CircularSpinnerWithContainer
