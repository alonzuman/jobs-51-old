import { Typography } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between
`

const RightSection = styled.div`

`

const LeftSection = styled.div`

`

const PageSectionTitle = ({ title, subtitle, action, ...rest }) => {
  return (
    <Container {...rest}>
      <RightSection>
        <Typography className='lh-1 mt-0' variant='h3'>{title}</Typography>
        <Typography variant='subtitle1'>{subtitle}</Typography>
      </RightSection>
      <LeftSection>
        {action}
      </LeftSection>
    </Container>
  )
}

export default PageSectionTitle
