import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getActivities } from '../../../../actions'
import ActivitiesList from '../../../../components/lists/ActivitiesList'
import Container from '../../../../v2/atoms/Container'
import PageSection from '../../../../v2/atoms/PageSection'
import PageHeader from '../../../../v2/organisms/PageHeader'
import ActivitiesFilter from './components/ActivitiesFilter'
import qs from 'query-string'
import { useHistory } from 'react-router-dom'
import { Typography } from '@material-ui/core'
import styled from 'styled-components'
import PageSectionTitle from '../../../../v2/atoms/PageSectionTitle'

const Region = styled.span`
  color: ${props => props.color}
`

const Activities = () => {
  const { translation, theme } = useSelector(state => state.theme);
  const { loading, activities } = useSelector(state => state.activities);
  const [region, setRegion] = useState('')
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    const { search } = history.location
    const parsedQuery = qs.parse(search)

    const { selectedRegion } = parsedQuery;

    if (selectedRegion) {
      setRegion(selectedRegion)
    } else {
      setRegion('')
    }
    dispatch(getActivities(parsedQuery))
  }, [history.location.search])

  return (
    <Container>
      <PageSection>
        <PageHeader className='mb-0' title={translation.manageActivities} backButton />
      </PageSection>
      <PageSection className='sticky t-0 z-9'>
        <ActivitiesFilter />
      </PageSection>
      <PageSection>
        <PageSectionTitle
          title={region ? <>{translation.resultsInRegion} <Region color={theme?.palette?.primary?.main}>{region}</Region></> : translation.latestActivities}
        />
      </PageSection>
      <PageSection>
        <ActivitiesList loading={loading} activities={activities} showUser />
      </PageSection>
    </Container>
  )
}

export default Activities
