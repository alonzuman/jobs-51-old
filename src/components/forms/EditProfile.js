import React, { useState } from 'react'
import UserDetails from './profile/UserDetails'
import PersonalDetails from './profile/PersonalDetails'
import { Tabs, Tab, Container, Paper } from '@material-ui/core'
import { useSelector } from 'react-redux'
import Settings from './Settings'

const EditProfile = () => {
  const [value, setValue] = useState(0)
  const { translation } = useSelector(state => state.theme)

  const handleValueChange = (newValue) => setValue(newValue)

  return (
    <div style={{direction: 'rtl'}}>
    <Paper>
      <Tabs indicatorColor='primary' value={value}>
        <Tab label={translation.userDetails} onClick={() => handleValueChange(0)} />
        <Tab label={translation.personalDetails} onClick={() => handleValueChange(1)}  />
        <Tab label={translation.settings} onClick={() => handleValueChange(2)}  />
      </Tabs>
    </Paper>
    <Container>
      {value === 0 && <UserDetails />}
      {value === 1 && <PersonalDetails />}
      {value === 2 && <Settings />}
    </Container>
    </div>
  )
}

export default EditProfile
