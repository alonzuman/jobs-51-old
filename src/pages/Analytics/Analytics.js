import { Button } from '@material-ui/core'
import React from 'react'
import useTheme from '../../hooks/useTheme'
import Container from '../../v2/atoms/Container'
import PageSection from '../../v2/atoms/PageSection'
import PageHeader from '../../v2/organisms/PageHeader'
import AdminStats from '../Admin/pages/Users/components/AdminStats'

const Analytics = () => {
  const { translation } = useTheme();

  return (
    <Container>
      <PageSection>
        <PageHeader backButton title={translation.generalStats} />
      </PageSection>
      <PageSection>
        <AdminStats />
      </PageSection>
    </Container>
  )
}

export default Analytics
