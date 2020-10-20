import React from 'react'
import { useSelector } from 'react-redux'

import SettingsForm from '../components/forms/Settings'
import PageContainer from '../components/layout/PageContainer'
import PageHeader from '../v2/organisms/PageHeader'

const Settings = () => {
  const { translation } = useSelector(state => state.theme)

  return (
    <PageContainer>
      <PageHeader spaceBottom backButton title={translation?.settings} />
      <SettingsForm />
    </PageContainer>
  )
}

export default Settings
