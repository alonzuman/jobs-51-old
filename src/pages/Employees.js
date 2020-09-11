import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getEmployees } from '../actions/users'
import UsersList from '../components/lists/UsersList'
import TopBar from '../components/layout/TopBar'
import { Skeleton } from '@material-ui/lab'
import PageContainer from '../components/layout/PageContainer'

const Employees = () => {
  const { translation } = useSelector(state => state.theme)
  const { loading } = useSelector(state => state.users)
  const dispatch = useDispatch()

  useEffect(() => { dispatch(getEmployees()) }, [dispatch])

  return (
    <>
      <TopBar
        backButton={true}
        title={loading ? <Skeleton variant='rect' height={42} width={320} /> : translation.usersLookingForJob}
      />
      <PageContainer>
        <UsersList />
      </PageContainer>
    </>
  )
}

export default Employees
