import React from 'react'
import PageHeader from '../../v2/organisms/PageHeader'

// Icons
import Container from '../../v2/atoms/Container';
import { useSelector } from 'react-redux';
import NotificationsList from './components/NotificationsList';
import PageSection from '../../v2/atoms/PageSection';
import PageSectionTitle from '../../v2/atoms/PageSectionTitle';

const Notifications = ({ match }) => {
  const { translation } = useSelector(state => state.theme)
  const { all, isFetching } = useSelector(state => state.notifications)

  const newNotifications = all?.filter (v => !v.seen)
  const oldNotifications = all?.filter(v => v.seen)

  if (isFetching) {
    return (
      <Container>
        <PageSection>
          <PageHeader loading/>
        </PageSection>
      </Container>
    )
  } else {
    return (
      <Container>
        <PageSection>
          <PageHeader
            title={translation.notifications}
          />
        </PageSection>
        <PageSection>
          <PageSectionTitle subtitle={translation.newNotifications} />
          <NotificationsList loading={isFetching} all={newNotifications} />
        </PageSection>
        <PageSection>
          <PageSectionTitle subtitle={translation.oldNotifications} />
          <NotificationsList loading={isFetching} all={oldNotifications} />
        </PageSection>
      </Container>
    )
  }
}

export default Notifications
