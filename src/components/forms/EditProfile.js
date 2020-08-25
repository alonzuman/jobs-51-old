import React, { useState, useEffect } from 'react'
import UserDetails from './profile/UserDetails'
import PersonalDetails from './profile/PersonalDetails'
import { Tabs, Tab, Container, Paper, Typography, Box } from '@material-ui/core'
import { useSelector } from 'react-redux'
import Settings from './Settings'

const EditProfile = () => {
  const [value, setValue] = useState(0)
  const { translation, theme } = useSelector(state => state.theme)
  const handleValueChange = (newValue) => setValue(newValue)

  const paperStyle = {
    borderBottom: `1px solid ${theme.palette.background.default}`,
    padding: '0 1rem',
  }

  return (
    <div style={{direction: 'rtl'}}>
      <Paper style={paperStyle} square elevation={0}>
      <Typography variant='h1'>{translation.myProfile}</Typography>
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
