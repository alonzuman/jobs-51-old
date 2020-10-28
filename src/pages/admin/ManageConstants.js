import { Typography } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import Container from '../../v2/atoms/Container'
import PageSection from '../../v2/atoms/PageSection'
import PageHeader from '../../v2/organisms/PageHeader'

const ManageConstants = () => {
  const { translation } = useSelector(state => state.theme)

  return (
    <Container>
      <PageSection>
        <PageHeader title={translation.manageConstants} backButton spaceBottom />
      </PageSection>
      <PageSection>
        {translation.notReadyYet}
      </PageSection>
    </Container>
  )
}

export default ManageConstants
