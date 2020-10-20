import { Typography } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'
import BackButton from '../../components/layout/BackButton'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  justify-content: space-between;
`

const ItemsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const PageHeader = ({ title, backButton }) => {
  return (
    <Container>
      {backButton && <BackButton />}
      <ItemsWrapper>
        <Typography variant='h1'>{title}</Typography>
      </ItemsWrapper>
    </Container>
  )
}

export default PageHeader
