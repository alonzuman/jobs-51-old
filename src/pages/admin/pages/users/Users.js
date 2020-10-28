import React, { useEffect, useState } from 'react'
import Container from '../../../../v2/atoms/Container'
import PageHeader from '../../../../v2/organisms/PageHeader'
import UsersFilter from './components/UsersFilter'
import qs from 'query-string'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../../../../actions/users'
import UsersList from '../../../../components/lists/UsersList'
import PageSection from '../../../../v2/atoms/PageSection'

const Users = () => {
  const [view, setView] = useState('list')
  const { loading, users } = useSelector(state => state.users)
  const { translation } = useSelector(state => state.theme)
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    const { search } = history.location
    const parsedQuery = qs.parse(search)
    dispatch(getUsers(parsedQuery))
  }, [history.location.search])

  return (
    <Container>
      <PageSection>
        <PageHeader title={translation.usersPageTitle} backButton spaceBottom backLink='/admin' />
      </PageSection>
      <PageSection>
        <UsersFilter view={view} setView={setView} />
      </PageSection>
      <PageSection>
        {view === 'list' && <UsersList loading={loading} users={users} />}
      </PageSection>
    </Container>
  )
}

export default Users
