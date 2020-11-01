import React from 'react'
import styled from 'styled-components'

const Section = styled.div`
  padding: ${props => props.disableGutters ? '' : '0 16px'};
  margin-bottom: ${props => props.spaceBottom ? '96px' : ''};
  position: ${props => props.sticky ? 'sticky' : 'relative'};
  top: ${props => props.sticky ? 0 : ''};

  :not(last-of-type) {
    margin-bottom: 8px;
  }
`

const PageSection = ({ children, disableGutters, spaceBottom, ...rest }) => {
  return (
    <Section disableGutters={disableGutters} spaceBottom={spaceBottom} {...rest}>
      {children}
    </Section>
  )
}

export default PageSection
