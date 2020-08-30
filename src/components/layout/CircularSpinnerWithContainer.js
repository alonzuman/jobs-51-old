import React from 'react'
import { CircularProgress } from '@material-ui/core'
import PageContainer from './PageContainer'


const CircularSpinnerWithContainer = () => {
  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '75vh',
  }

  return (
    <PageContainer style={containerStyle}>
      <CircularProgress />
    </PageContainer>
  )
}

export default CircularSpinnerWithContainer
