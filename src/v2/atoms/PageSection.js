import React from 'react'
import styled from 'styled-components'

const Section = styled.div`
  padding: 0 16px;
`

const PageSection = ({ children }) => {
  return (
    <Section>
      {children}
    </Section>
  )
}

export default PageSection
