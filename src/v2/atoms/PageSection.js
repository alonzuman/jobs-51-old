import React from 'react'
import styled from 'styled-components'

const Section = styled.div`
  padding: 0 16px;
  margin-bottom: ${props => props.spaceBottom ? '96px' : ''};
`

const PageSection = ({ children, spaceBottom, ...rest }) => {
  return (
    <Section spaceBottom={spaceBottom} {...rest}>
      {children}
    </Section>
  )
}

export default PageSection
