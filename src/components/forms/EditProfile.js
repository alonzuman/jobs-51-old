import React, { useState, useEffect } from 'react'
import UserDetails from './profile/UserDetails'
import PersonalDetails from './profile/PersonalDetails'
import { Tabs, Tab, Container, Paper, Typography, Box } from '@material-ui/core'
import { useSelector } from 'react-redux'
import Settings from './Settings'
import TopBar from '../layout/TopBar'

const EditProfile = () => {
  const [value, setValue] = useState(0)
  const { translation, theme } = useSelector(state => state.theme)
  const handleValueChange = (newValue) => setValue(newValue)

  return (
    <>
      <TopBar title={translation.myProfile}>
        <Tabs style={{width: '100%'}} indicatorColor='primary' value={value}>
          <Tab label={translation.userDetails} onClick={() => handleValueChange(0)} />
          <Tab label={translation.personalDetails} onClick={() => handleValueChange(1)}  />
          <Tab label={translation.settings} onClick={() => handleValueChange(2)}  />
        </Tabs>
      </TopBar >
      <Container>
        {value === 0 && <UserDetails />}
        {value === 1 && <PersonalDetails />}
        {value === 2 && <Settings />}
      </Container>
    </>
  )
}

export default EditProfile
