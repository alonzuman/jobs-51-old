import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getStats } from '../../../../../actions/constants';

const AdminStats = () => {
  const { translation } = useSelector(state => state.theme);
  const { isFetching, isFetched, stats } = useSelector(state => state.constants)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getStats())
  }, [])

  return (
    <div>
      {isFetching && <h1>fetching</h1>}
      {isFetched && <h1>fetched</h1>}
    </div>
  )
}

export default AdminStats
