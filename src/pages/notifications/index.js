import React, { useEffect } from 'react'
import PageHeader from '../../v2/organisms/PageHeader'

// Icons
import Container from '../../v2/atoms/Container';
import { useDispatch, useSelector } from 'react-redux';
import NotificationsList from './components/NotificationsList';
import PageSection from '../../v2/atoms/PageSection';
import { getNotifications } from '../../actions/notifications';
import PageSectionTitle from '../../v2/atoms/PageSectionTitle';

const Notifications = ({ match }) => {
  const { uid } = match.params
  const { translation } = useSelector(state => state.theme)
  const { all, loading } = useSelector(state => state.notifications)
  const dispatch = useDispatch()

  useEffect(() => {
    if (all?.length === 0) {
      dispatch(getNotifications(uid))
    }
  }, [uid])

  const newNotifications = all?.filter (v => !v.seen)
  const oldNotifications = all?.filter(v => v.seen)

  return (
    <Container>
      <PageSection>
        <PageHeader
          loading={loading}
          title={translation.notifications}
          backButton
        />
      </PageSection>
      <PageSection>
        <PageSectionTitle subtitle={translation.newNotifications} />
        <NotificationsList loading={loading} all={newNotifications} />
      </PageSection>
      <PageSection>
        <PageSectionTitle subtitle={translation.oldNotifications} />
        <NotificationsList loading={loading} all={oldNotifications} />
      </PageSection>
    </Container>
  )
}

export default Notifications
