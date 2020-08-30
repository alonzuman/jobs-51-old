import React from 'react'
import { useSelector } from 'react-redux'
import { Container } from '@material-ui/core'

const PageContainer = ({ style, children }) => {
  const { theme } = useSelector(state => state.theme)

  const containerStyle = {
    backgroundColor: theme.palette.background.main,
    ...style
  }

  return (
    <Container style={containerStyle}>
      { children }
    </Container>
  )
}

export default PageContainer
