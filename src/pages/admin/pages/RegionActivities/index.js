import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getActivities } from '../../../../actions'
import ActivitiesList from '../../../../components/lists/ActivitiesList'
import Container from '../../../../v2/atoms/Container'
import PageSection from '../../../../v2/atoms/PageSection'
import PageHeader from '../../../../v2/organisms/PageHeader'

const RegionActivities = ({ match }) => {
  const { region } = match.params;
  const { translation } = useSelector(state => state.theme)
  const { loading, activities } = useSelector(state => state.activities)
  const query = {
    selectedRegion: region
  }
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getActivities(query))
  }, [region])

  return (
    <Container>
      <PageSection>
        <PageHeader
          className='mb-0'
          backButton
          title={<>{translation.manageRegionActivities} <span className='primary__color'>{region}</span></>}
        />
      </PageSection>
      <PageSection>
        <ActivitiesList showUser loading={loading} activities={activities} />
      </PageSection>
    </Container>
  )
}

export default RegionActivities
