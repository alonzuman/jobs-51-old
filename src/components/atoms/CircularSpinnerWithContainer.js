import React from 'react'
import { CircularProgress } from '@material-ui/core'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 75vh;
`

const CircularSpinnerWithContainer = () => {
  return (
    <Container>
      <CircularProgress />
    </Container>
  )
}

export default CircularSpinnerWithContainer
