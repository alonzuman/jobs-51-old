import { Avatar } from '@material-ui/core'
import { AvatarGroup } from '@material-ui/lab'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getRegion } from '../../actions'
import Container from '../../components/atoms/Container'
import PageSection from '../../components/atoms/PageSection'
import PageHeader from '../../components/organisms/PageHeader'
import PageHeaderActionsBar from '../../components/organisms/PageHeaderActionsBar'

const Region = ({ match }) => {
  const { region: regionName } = match.params;
  const { region, isFetchingRegion, isFetchedRegion, regionManagers } = useSelector(state => state.activities)
  const dispatch = useDispatch()

  useEffect(() => {
    if (regionName !== region.name) {
      dispatch(getRegion(regionName))
    }
  }, [regionName])

  if (isFetchingRegion) {
    return (
      <Container>
        <PageHeader loading />
      </Container>
    )
  } else {
    return (
      <Container>
        <PageHeaderActionsBar backButton/>
        <PageSection>
          <PageHeader
            title={regionName}
          />
        </PageSection>
        <PageSection>
          <AvatarGroup max={4} className='pt-25 pb-25'>
            {regionManagers?.map((v, i) => <Link key={i} to={`/users/${v?.uid}`}><Avatar src={v?.avatar} /></Link>)}
          </AvatarGroup>
        </PageSection>
        <PageSection divider>

        </PageSection>
      </Container>
    )
  }
}

export default Region
