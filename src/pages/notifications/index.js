import React from 'react'
import PageHeader from '../../components/organisms/PageHeader'

// Icons
import Container from '../../components/atoms/Container';
import { useSelector } from 'react-redux';
import NotificationsList from './components/NotificationsList';
import PageSection from '../../components/atoms/PageSection';
import PageSectionTitle from '../../components/atoms/PageSectionTitle';

const Notifications = ({ match }) => {
  const { translation } = useSelector(state => state.theme)
  const { all, isFetching } = useSelector(state => state.notifications)

  const newNotifications = all?.filter(v => !v.seen)
  const oldNotifications = all?.filter(v => v.seen)

  if (isFetching) {
    return (
      <Container>
        <PageSection>
          <PageHeader loading />
        </PageSection>
      </Container>
    )
  } else {
    return (
      <Container paddingBottom='16'>
        <PageSection transparent>
          <PageSectionTitle subtitle={translation.newNotifications} />
          <NotificationsList loading={isFetching} all={newNotifications} />
        </PageSection>
        <PageSection transparent>
          <PageSectionTitle subtitle={translation.oldNotifications} />
          <NotificationsList loading={isFetching} all={oldNotifications} />
        </PageSection>
      </Container>
    )
  }
}

export default Notifications
