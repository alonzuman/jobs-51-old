import { Typography } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'
import BackButton from '../../components/layout/BackButton'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: ${props => props.spaceBottom ? '16px' : ''};

  @media (max-width: 768px) {
    margin-top: ${props => props.spaceTop ? '64px' : ''};
  }
`

const ItemsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const PageHeader = ({ title, backButton, spaceBottom, spaceTop }) => {
  return (
    <Container spaceBottom={spaceBottom} spaceTop={spaceTop}>
      {backButton && <BackButton />}
      <ItemsWrapper>
        <Typography variant='h1'>{title}</Typography>
      </ItemsWrapper>
    </Container>
  )
}

export default PageHeader
