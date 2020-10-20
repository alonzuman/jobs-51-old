import React from 'react'
import { useSelector } from 'react-redux'
import PersonalInfoForm from '../components/forms/profile/PersonalInfo'
import PageContainer from '../components/layout/PageContainer'
import PageHeader from '../v2/organisms/PageHeader'

const PersonalInfo = () => {
  const { translation } = useSelector(state => state.theme)

  return (
    <PageContainer>
      <PageHeader backButton spaceBottom title={translation.personalInfo} />
      <PersonalInfoForm />
    </PageContainer>
  )
}

export default PersonalInfo
