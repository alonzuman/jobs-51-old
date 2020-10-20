import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getEmployees } from '../actions/users'
import UsersList from '../components/lists/UsersList'
import TopBar from '../components/layout/TopBar'
import { Skeleton } from '@material-ui/lab'
import PageContainer from '../components/layout/PageContainer'
import PageHeader from '../v2/organisms/PageHeader'

const Employees = () => {
  const { translation } = useSelector(state => state.theme)
  const { loading } = useSelector(state => state.users)
  const dispatch = useDispatch()

  useEffect(() => { dispatch(getEmployees()) }, [dispatch])

  return (
    <PageContainer>
      <PageHeader backButton spaceBottom title={translation.usersLookingForJob} />
      <UsersList />
    </PageContainer>
  )
}

export default Employees
