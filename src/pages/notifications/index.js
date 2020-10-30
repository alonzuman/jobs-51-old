import React, { useEffect } from 'react'
import PageHeader from '../../v2/organisms/PageHeader'

// Icons
import Container from '../../v2/atoms/Container';
import { useDispatch, useSelector } from 'react-redux';
import NotificationsList from './components/NotificationsList';
import PageSection from '../../v2/atoms/PageSection';
import { getNotifications } from '../../actions/notifications';

const Notifications = ({ match }) => {
  const { uid } = match.params
  const { translation } = useSelector(state => state.theme)
  const { all, loading } = useSelector(state => state.notifications)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getNotifications(uid))
  }, [uid])

  return (
    <Container>
      <PageHeader
        loading={loading}
        title={translation.notifications}
        backButton
        className='p-1'
      />
      <PageSection>
        <NotificationsList loading={loading} all={all} />
      </PageSection>
    </Container>
  )
}

export default Notifications
