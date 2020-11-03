import React from 'react'
import styled from 'styled-components'
import BackButton from '../atoms/BackButton'

const Container = styled.div`
  position: sticky;
  z-index: 9;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  top: 0px;

  @media (min-width: 768px) {
    top: 72px;
  }
`

const PageHeaderActionsBar = ({ backButton, backLink, secondaryActions, isScrolling }) => {
  return (
    <Container>
      {backButton && <BackButton isScrolling={isScrolling} backLink={backLink} />}
      {secondaryActions && secondaryActions}
    </Container>
  )
}

export default PageHeaderActionsBar
