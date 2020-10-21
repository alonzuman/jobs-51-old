import React from 'react'
import { useSelector } from 'react-redux'
import PageContainer from '../../components/layout/PageContainer'
import PageHeader from '../../v2/organisms/PageHeader';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import DataUsageIcon from '@material-ui/icons/DataUsage';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { Divider, MenuItem, MenuList } from '@material-ui/core'
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
    <PageContainer>
      <PageHeader spaceTop title={translation.adminPage} />
      <MenuList>
        {items.map((v, i) =>
          <Link key={i} to={v.link}>
            <MenuItem style={menuItemStyle}><span style={iconStyle}>{v.icon}</span>{v.label}</MenuItem>
            <Divider />
          </Link>
        )}
      </MenuList>
    </PageContainer>
  )
}

export default Admin
