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
  justify-content: space-between;
  width: 100%;
  align-items: center;
`

const TextContainer = styled.div`

`

const SecondaryContainer = styled.div`

`

const ActionsWrapper = styled.div`
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

const PageHeader = ({ title, action, subtitle, secondary, backButton, spaceBottom, spaceTop, className }) => {
  return (
    <Container className={className} spaceBottom={spaceBottom} spaceTop={spaceTop}>
      <ActionsWrapper>
        {backButton && <BackButton />}
        {action && action}
      </ActionsWrapper>
      <ItemsWrapper>
        <TextContainer>
          <Typography className='p-0' variant='h1'>{title}</Typography>
          <Typography variant='subtitle1'>{subtitle}</Typography>
        </TextContainer>
        <SecondaryContainer>
          {secondary}
        </SecondaryContainer>
      </ItemsWrapper>
    </Container>
  )
}

export default PageHeader
