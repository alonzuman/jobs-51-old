import React from 'react'
import { useSelector } from 'react-redux'
import TopBar from '../components/layout/TopBar'
import PersonalInfoForm from '../components/forms/profile/PersonalInfo'
import PageContainer from '../components/layout/PageContainer'

const PersonalInfo = () => {
  const { translation } = useSelector(state => state.theme)

  return (
    <>
      <TopBar backButton title={translation.personalInfo} />
      <PageContainer>
        <PersonalInfoForm />
      </PageContainer>
    </>
  )
}

export default PersonalInfo
