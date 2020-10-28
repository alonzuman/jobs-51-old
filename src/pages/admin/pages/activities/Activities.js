import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getActivities } from '../../../../actions'
import ActivitiesList from '../../../../components/lists/ActivitiesList'
import Container from '../../../../v2/atoms/Container'
import PageSection from '../../../../v2/atoms/PageSection'
import PageHeader from '../../../../v2/organisms/PageHeader'
import ActivitiesFilter from './components/ActivitiesFilter'
import qs from 'query-string'
import { useHistory } from 'react-router-dom'

const Activities = () => {
  const { translation } = useSelector(state => state.theme);
  const { loading, activities } = useSelector(state => state.activities);
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    const { search } = history.location
    const parsedQuery = qs.parse(search)

    dispatch(getActivities(parsedQuery))
  }, [history.location.search])

  return (
    <Container>
      <PageSection>
        <PageHeader title={translation.manageActivities} backButton />
      </PageSection>
      <PageSection>
        <ActivitiesFilter />
      </PageSection>
      <PageSection>
        <ActivitiesList loading={loading} activities={activities} showUser />
      </PageSection>
    </Container>
  )
}

export default Activities
