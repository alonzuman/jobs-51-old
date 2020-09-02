import React, { useState } from 'react'
import UserDetails from './profile/UserDetails'
import PersonalDetails from './profile/PersonalDetails'
import { Tabs, Tab, Container } from '@material-ui/core'
import { useSelector } from 'react-redux'
import Settings from './Settings'
import TopBar from '../layout/TopBar'
import PageContainer from '../layout/PageContainer'

const EditProfile = () => {
  const [value, setValue] = useState(0)
  const { translation, theme } = useSelector(state => state.theme)
  const handleValueChange = (newValue) => setValue(newValue)

  const tabStyle = {
    color: theme.typography.subtitle1.color
  }

  return (
    <>
      <TopBar title={translation.myProfile} />
      <Tabs className='max__width margin__center full__width' indicatorColor='primary' value={value}>
        <Tab style={tabStyle} label={translation.userDetails} onClick={() => handleValueChange(0)} />
        <Tab style={tabStyle} label={translation.personalDetails} onClick={() => handleValueChange(1)}  />
        <Tab style={tabStyle} label={translation.settings} onClick={() => handleValueChange(2)}  />
      </Tabs>
      <PageContainer>
        {value === 0 && <UserDetails />}
        {value === 1 && <PersonalDetails />}
        {value === 2 && <Settings />}
      </PageContainer>
    </>
  )
}

export default EditProfile
