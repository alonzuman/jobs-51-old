import React, { useEffect, useState } from 'react'
import UserDetails from './profile/UserDetails'
import PersonalDetails from './profile/PersonalDetails'
import { Tabs, Tab } from '@material-ui/core'
import { useSelector } from 'react-redux'
import Settings from './Settings'
import TopBar from '../layout/TopBar'
import PageContainer from '../layout/PageContainer'
import SecondaryBar from '../layout/SecondaryBar'
import { useHistory } from 'react-router-dom'

const EditProfile = ({ match }) => {
  const history = useHistory()
  const { url } = match;
  const { translation, theme } = useSelector(state => state.theme)

  const handleValueChange = (value) => {
    history.replace(value)
  }

  const tabStyle = {
    color: theme.typography.subtitle1.color,
    backgroundColor: theme.palette.background.light
  }

  return (
    <>
      <TopBar title={translation.myProfile} />
      <SecondaryBar>
        <Tabs style={tabStyle} className='max__width margin__center full__width' indicatorColor='primary' value={url}>
          <Tab style={tabStyle} label={translation.userDetails} value={'/profile/user-details'} onClick={() => handleValueChange('/profile/user-details')} />
          <Tab style={tabStyle} label={translation.personalDetails} value={'/profile/personal-details'} onClick={() => handleValueChange('/profile/personal-details')}  />
          <Tab style={tabStyle} label={translation.settings} value={'/profile/settings'} onClick={() => handleValueChange('/profile/settings')}  />
        </Tabs>
      </SecondaryBar>
      <PageContainer>
        {url === '/profile/user-details' && <UserDetails />}
        {url === '/profile/personal-details' && <PersonalDetails />}
        {url === '/profile/settings' && <Settings />}
      </PageContainer>
    </>
  )
}

export default EditProfile
