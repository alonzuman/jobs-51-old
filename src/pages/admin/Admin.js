import React from 'react'
import { useSelector } from 'react-redux'
import PageContainer from '../../components/layout/PageContainer'
import PageHeader from '../../v2/organisms/PageHeader';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import DataUsageIcon from '@material-ui/icons/DataUsage';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { Divider, MenuItem, MenuList } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { checkPermissions } from '../../utils';

const Admin = () => {
  const { translation } = useSelector(state => state.theme);
  const { role } = useSelector(state => state.auth);

  const items = [
    { label: translation.manageUsers, icon: <PeopleAltIcon />, link: '/admin/users', minRole: 2 },
    { label: translation.manageActivities, icon: <AssignmentIcon />, link: '/admin/activities', minRole: 2 },
    { label: translation.manageConstants, icon: <DataUsageIcon />, link: '/admin/constants', minRole: 3 },
  ]

  const iconStyle = {
    marginLeft: 8,
    lineHeight: 0
  }

  return (
    <PageContainer>
      <PageHeader spaceTop title={translation.adminPage} />
      <MenuList>
        {items.map((v, i) => {
          if (checkPermissions(role) >= v.minRole)
          return (
            <Link key={i} to={v.link}>
              <MenuItem className='mb-5 mt-5'>
                <span style={iconStyle}>{v.icon}</span>
                {v.label}
              </MenuItem>
              <Divider />
            </Link>
          )
        })}
      </MenuList>
    </PageContainer>
  )
}

export default Admin
