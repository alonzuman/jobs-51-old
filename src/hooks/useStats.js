import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getStats } from '../actions/constants';

const useStats = () => {
  const { isFetched, isFetching, all } = useSelector(state => state.constants.stats);
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isFetched) {
      dispatch(getStats())
    }
  }, [])

  return { isFetching, isFetched, all };
}

export default useStats;
