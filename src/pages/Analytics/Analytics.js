import React from 'react'
import useTheme from '../../hooks/useTheme'
import Container from '../../v2/atoms/Container'
import PageSection from '../../v2/atoms/PageSection'
import PageHeader from '../../v2/organisms/PageHeader'
import GeneralStats from '../Admin/pages/Users/components/GeneralStats'

const Analytics = () => {
  const { translation } = useTheme();

  return (
    <Container>
      <PageSection>
        <PageHeader backButton title={translation.generalStats} />
      </PageSection>
      <PageSection>
        <GeneralStats />
      </PageSection>
    </Container>
  )
}

export default Analytics
