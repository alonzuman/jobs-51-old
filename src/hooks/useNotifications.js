import { useSelector } from 'react-redux';

const useNotifications = () => {
  const notifications = useSelector(state => state.notifications);
  const { isFetching, isFetched } = notifications;

  return {
    isFetching,
    isFetched,
    ...notifications
  }
}

export default useNotifications;
