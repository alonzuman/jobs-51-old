import React from 'react'
import { useSelector } from 'react-redux'
import PageHeader from '../../v2/organisms/PageHeader';
import { Divider, ListItem, List, ListItemIcon, ListItemText, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { checkPermissions } from '../../utils';

// Icons
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import SettingsIcon from '@material-ui/icons/Settings';
import PageSection from '../../v2/atoms/PageSection';
import Container from '../../v2/atoms/Container';
import AdminStats from './pages/Users/components/AdminStats';
import PageSectionTitle from '../../v2/atoms/PageSectionTitle';

const Admin = () => {
  const { translation } = useSelector(state => state.theme);
  const { role } = useSelector(state => state.auth);

  const generalPages = [
    { label: translation.manageUsers, icon: <PeopleAltIcon />, link: '/admin/users?view=list', minRole: 2 },
    { label: translation.manageActivities, icon: <AssignmentIcon />, link: '/admin/activities?view=list', minRole: 2 },
    { label: translation.generalManagement, icon: <SettingsIcon />, link: '/admin/general-management', minRole: 3 },
  ]

  return (
    <Container>
      <PageSection>
        <PageHeader title={translation.adminPage} className='mb-1' />
      </PageSection>
      <PageSection>
        <AdminStats />
      </PageSection>
      <PageSection>
        <PageSectionTitle title={translation.general} />
        <List>
          {generalPages?.map((v, i) => {
            if (checkPermissions(role) >= v.minRole)
              return (
                <Link key={i} to={v.link}>
                  <ListItem disableGutters button>
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
      </PageSection>
    </Container>
  )
}

export default Admin
