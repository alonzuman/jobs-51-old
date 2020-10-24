import React from 'react'
import styled from 'styled-components'

const Section = styled.div`
  padding: 0 16px;
  margin-bottom: ${props => props.spaceBottom ? '96px' : ''};
`

const PageSection = ({ children, spaceBottom }) => {
  return (
    <Section spaceBottom={spaceBottom}>
      {children}
    </Section>
  )
}

export default PageSection
