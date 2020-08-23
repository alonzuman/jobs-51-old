import React, { useState } from 'react'
import UserDetails from './profile/UserDetails'
import PersonalDetails from './profile/PersonalDetails'
import { Tabs, Tab, Container, Paper } from '@material-ui/core'
import { useSelector } from 'react-redux'
import Settings from './Settings'

const EditProfile = () => {
  const [value, setValue] = useState(0)
  const { translation, theme } = useSelector(state => state.theme)

  const handleValueChange = (newValue) => setValue(newValue)

  const paperStyle = {
    borderRadius: 0,
    boxShadow: 'none',
    borderBottom: `1px solid ${theme.palette.background.default}`
  }

  return (
    <div style={{direction: 'rtl'}}>
    <Paper style={paperStyle}>
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
