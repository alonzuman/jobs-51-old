import React from 'react'
import { useSelector } from 'react-redux'
import TopBar from '../components/layout/TopBar'
import SettingsForm from '../components/forms/Settings'
import PageContainer from '../components/layout/PageContainer'

const Settings = () => {
  const { translation } = useSelector(state => state.theme)

  return (
    <>
    <TopBar backButton title={translation?.settings} />
    <PageContainer>
      <SettingsForm />
    </PageContainer>
    </>
  )
}

export default Settings
