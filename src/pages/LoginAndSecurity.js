import React from 'react'
import { useSelector } from 'react-redux'
import LoginAndSecurityForm from '../components/forms/profile/LoginAndSecurity'
import PageContainer from '../components/layout/PageContainer'
import PageHeader from '../v2/organisms/PageHeader'

const LoginAndSecurity = () => {
  const { translation } = useSelector(state => state.theme)

  return (
    <PageContainer>
      <PageHeader spaceBottom title={translation.loginAndSecurity} backButton />
      <LoginAndSecurityForm />
    </PageContainer>
  )
}

export default LoginAndSecurity
