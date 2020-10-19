import React from 'react'
import { useSelector } from 'react-redux'
import TopBar from '../components/layout/TopBar'
import PageContainer from '../components/layout/PageContainer'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import DataUsageIcon from '@material-ui/icons/DataUsage';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { MenuItem, MenuList } from '@material-ui/core'
import { Link } from 'react-router-dom'

const Admin = () => {
  const { translation, theme } = useSelector(state => state.theme)

  const items = [
    { label: translation.manageUsers, icon: <PeopleAltIcon />, link: '/admin/users' },
    { label: translation.manageActivities, icon: <AssignmentIcon />, link: '/admin/activities' },
    { label: translation.manageConstants, icon: <DataUsageIcon />, link: '/admin/constants' },
  ]

  const menuItemStyle = {
    borderBottom: `1px solid ${theme?.palette?.border?.main}`
  }

  const iconStyle = {
    marginLeft: 8
  }

  return (
    <>
      <TopBar title={translation.adminPage} />
      <PageContainer>
        <MenuList>
          {items.map((v, i) =>
            <Link key={i} to={v.link}>
              <MenuItem style={menuItemStyle}><span style={iconStyle}>{v.icon}</span>{v.label}</MenuItem>
            </Link>
          )}
        </MenuList>
      </PageContainer>
    </>
  )
}

export default Admin
