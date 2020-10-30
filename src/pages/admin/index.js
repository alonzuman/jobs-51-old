import React from 'react'
import { useSelector } from 'react-redux'
import PageContainer from '../../components/layout/PageContainer'
import PageHeader from '../../v2/organisms/PageHeader';
import { Divider, ListItem, List, ListItemIcon, ListItemText, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { checkPermissions } from '../../utils';

// Icons
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import DataUsageIcon from '@material-ui/icons/DataUsage';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';

const Admin = () => {
  const { translation } = useSelector(state => state.theme);
  const { role, region } = useSelector(state => state.auth);

  const regionSpecificPages = [
    { label: translation.manageRegionUsers, icon: <AssignmentIndIcon />, link: `/admin/${region}/users`, minRole: 2 },
    { label: translation.manageRegionActivities, icon: <AssignmentTurnedInIcon />, link: `/admin/${region}/activities`, minRole: 2 },
  ]

  const generalPages = [
    { label: translation.manageUsers, icon: <PeopleAltIcon />, link: '/admin/users', minRole: 2 },
    { label: translation.manageActivities, icon: <AssignmentIcon />, link: '/admin/activities', minRole: 2 },
  ]

  return (
    <PageContainer>
      <PageHeader spaceTop title={translation.adminPage} />
      {region &&
        <>
          <Typography variant='subtitle1'>{translation.manageRegion}</Typography>
          <List>
            {regionSpecificPages?.map((v, i) => {
              if (checkPermissions(role) >= v.minRole) {
                return (
                  <Link to={v.link} key={i}>
                    <ListItem button>
                      <ListItemIcon>
                        {v.icon}
                      </ListItemIcon>
                      <ListItemText>
                        {v.label} {region}
                      </ListItemText>
                    </ListItem>
                  </Link>
                )
              }
            })}
          </List>
        </>}
      <Divider />
      <Typography className='mt-2' variant='subtitle1'>{translation.general}</Typography>
      <List>
        {generalPages?.map((v, i) => {
          if (checkPermissions(role) >= v.minRole)
            return (
              <Link key={i} to={v.link}>
                <ListItem button>
                  <ListItemIcon>
                    {v.icon}
                  </ListItemIcon>
                  <ListItemText>
                    {v.label}
                  </ListItemText>
                </ListItem>
              </Link>
            )
        })}
      </List>
    </PageContainer>
  )
}

export default Admin
