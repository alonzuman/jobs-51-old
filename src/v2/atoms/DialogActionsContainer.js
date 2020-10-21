import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const Container = styled.div`
  position: sticky;
  border-top: 1px solid ${props => props.border};
  bottom: 0;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const DialogActionsContainer = ({ children, border = true }) => {
  const { theme } = useSelector(state => state.theme)
  return <Container border={border ? theme?.palette?.border?.strong : 'none'}>{children}</Container>
}

export default DialogActionsContainer
