import { useSelector } from 'react-redux';

const useCurrentUser = () => {
  const currentUser = useSelector(state => state.auth);
  const { isFetching, isFetched, isUpdating, isUpdated, isDeleting, isDeleted } = currentUser;

  return {
    isFetching,
    isFetched,
    isUpdating,
    isUpdated,
    isDeleting,
    isDeleted,
    ...currentUser
  }
}

export default useCurrentUser;
