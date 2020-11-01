import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: ${props => props.disableGutters ? '' : '8px 16px'};
  position: ${props => props.sticky ? 'sticky' : 'relative'};
  top: 0;
  z-index: 99;
  background-color: ${props => props.background};
  margin-bottom: 8px;

  @media (max-width: 768px) {
    width: 100%;
  }
`

const TopBar = ({ sticky, disableGutters = false, children, ...rest }) => {
  const { theme } = useSelector(state => state.theme)

  return (
    <Container disableGutters={disableGutters} sticky={sticky} background={theme?.palette?.background?.main} {...rest}>
      {children}
    </Container>
  )
}

export default TopBar
