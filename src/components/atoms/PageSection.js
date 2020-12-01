import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import useTheme from '../../hooks/useTheme'

const Section = styled.div`
  padding: ${props => props.disableGutters ? '' : '0 16px'};
  margin-bottom: ${props => props.spaceBottom ? '96px' : ''};
  position: ${props => props.sticky ? 'sticky' : 'relative'};
  background-color: ${props => props.transparent ? '' : props.background};
  top: ${props => props.sticky ? 0 : ''};
  z-index: ${props => props.sticky ? 9 : 1};
  display: ${props => props.flex ? 'flex' : ''};
  justify-content: ${props => props.justifyContent ? props.justifyContent : ''};

  :not(last-of-type) {
    margin-bottom: 8px;
  }
`

const PageSection = ({ children, disableGutters, spaceBottom, sticky, transparent, ...rest }) => {
  const { theme } = useTheme();

  return (
    <Section
      disableGutters={disableGutters}
      spaceBottom={spaceBottom}
      sticky={sticky}
      transparent={transparent}
      background={theme?.palette?.background?.main}
      {...rest}
    >
      {children}
    </Section>
  )
}

export default PageSection
