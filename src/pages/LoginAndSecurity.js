import React from 'react'
import { useSelector } from 'react-redux'
import TopBar from '../components/layout/TopBar'
import LoginAndSecurityForm from '../components/forms/profile/LoginAndSecurity'
import PageContainer from '../components/layout/PageContainer'

const LoginAndSecurity = () => {
  const { translation } = useSelector(state => state.theme)

  return (
    <>
      <TopBar title={translation.loginAndSecurity} backButton />
      <PageContainer>
        <LoginAndSecurityForm />
      </PageContainer>
    </>
  )
}

export default LoginAndSecurity
